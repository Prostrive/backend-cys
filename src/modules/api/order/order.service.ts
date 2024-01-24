import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  Language,
  Order,
  OrderDriverStatus,
  ProductStatus,
  Status,
  Prisma,
  WalletTransactionType,
} from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { OrderLineService } from '../order-line/order-line.service';
import {
  CreateOrderDto,
  CreateOrderWithoutStripeDto,
  storeInterface,
} from './dto/create-order.dto';
import { StoreOrderService } from '../store-order/store-order.service';
import { generateOrderNumber } from '@/utils/orderNumber';

import { customAlphabet } from 'nanoid';
import { OrderTripService } from '../order-trip/order-trip.service';
import { CustomerAddressService } from '../customer-address/customer-address.service';
import { CustomerService } from '../customer/customer.service';
import { DriverService } from '../driver/driver.service';
import { WalletTransactionService } from '../wallet-transaction/wallet-transaction.service';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
    @Inject(forwardRef(() => DriverService))
    private driverService: DriverService,
    private readonly customerPaymentService: CustomerPaymentService,
    private readonly storeOrderService: StoreOrderService,
    private readonly orderLineService: OrderLineService,
    private readonly orderTripService: OrderTripService,
    private readonly customerAddressService: CustomerAddressService,
    private readonly customerService: CustomerService,
    private readonly walletTransactionService: WalletTransactionService,
    private readonly sendgridService: SendgridService,
  ) {}

  /** This will create order and also the payments
   * Also handles when customer uses their CYS credits
   * @param createOrderDto
   * @returns created order and transaction details
   */
  async create(createOrderDto: CreateOrderDto, language: Language) {
    const customerAddress = await this.customerAddressService.findOne(
      createOrderDto.order.customerAddressId,
    );

    const orderNumberResult = generateOrderNumber(customerAddress);

    // Assign the generated orderNumber to the orderNumber field
    createOrderDto.order.orderNumber = orderNumberResult;

    try {
      const result = await this.prisma.$transaction(async () => {
        // Creating an Order object
        const {
          customerId,
          orderNumber,
          asap,
          customerAddressId,
          deliveryNote,
          deliveryDate,
          stripePaymentIntent,
          stripeTransferGroup,
        } = createOrderDto.order;

        const order = await this.prisma.order.create({
          data: {
            orderNumber,
            customerId,
            asap,
            deliveryDate,
            deliveryNote,
            customerAddressId,
            deliveryFee: createOrderDto.order.deliveryFee,
          },
          include: { customer: true, customerAddress: true },
        });

        if (!order) {
          throw new Error('Order is not created');
        }

        let cysCreditsUsed = 0;
        // Check if  the driver has sufficient credit for the order
        if (
          createOrderDto.order.cysCredits &&
          createOrderDto.order.customerId
        ) {
          const usedOrderCysCredit = new Prisma.Decimal(
            createOrderDto.order.cysCredits.toFixed(2),
          );

          const customerCYSCredit = await this.customerService.getCYSCredit(
            createOrderDto.order.customerId,
          );

          if (usedOrderCysCredit.greaterThan(customerCYSCredit)) {
            throw new Error('Insufficient CYS credit');
          }

          cysCreditsUsed = createOrderDto.order.cysCredits;

          // Deduct cysCredit used on this order from walletBalance
          await this.walletTransactionService.create({
            customerId: createOrderDto.order.customerId,
            amount: Number(usedOrderCysCredit),
            walletTransactionType: WalletTransactionType.decrease,
            description: `Delivery credits used from ${order.orderNumber}`,
            orderId: order.id,
          });
          await this.customerService.updateWalletBalance(
            createOrderDto.order.customerId,
            usedOrderCysCredit,
            'decrease',
          );
        }

        // Looping through all stores and items and creating order-items, payments, and transfers
        const { orderSubtotal, storeOrdersWithOrderLines } =
          await this.loopThroughStores(
            order,
            createOrderDto.orderItemsPerStore,
            language,
          );
        const totalOrderPayment =
          orderSubtotal + createOrderDto.order.deliveryFee;
        // Creating an Order Payment object for overall order
        const orderPayment =
          await this.customerPaymentService.createCustomerPayment({
            orderId: order.id,
            subtotal: orderSubtotal,
            deliveryFee: createOrderDto.order.deliveryFee,
            total: totalOrderPayment - cysCreditsUsed,
            stripeTransferGroup,
            stripePaymentIntent,
            status: Status.completed,
          });

        return {
          order,
          orderPayment,
          ...(createOrderDto.order.cysCredits && {
            cysCreditUsed: createOrderDto.order.cysCredits,
          }),
          storeOrdersWithOrderLines,
        };
      });

      if (result) {
        try {
          this.sendgridService.sendOrderConfirmationEmail(
            result.order.customer.email,
            {
              orderNumber: result.order.orderNumber,
              customerDetails: {
                name: result.order.customer.name,
                address: result.order.customerAddress.formattedAddress,
              },
              deliveryFee: result.order.deliveryFee,
              subtotal: result.orderPayment.subtotal,
              total: result.order.deliveryFee + result.orderPayment.subtotal,
              orders: result.storeOrdersWithOrderLines,
            },
          );
        } catch (error) {
          console.log(error.message);
        }
        return result;
      } else {
        throw new Error('Order creation failed');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  /** This will create an order and update the customer walletBalance when the order total is equal to CYS credit balance used
   *
   * @param createOrderWithoutStripeDto
   * @returns created order and walletBalance transaction details
   */
  async createWithoutStripePayment(
    createOrderWithoutStripeDto: CreateOrderWithoutStripeDto,
    language: Language,
  ) {
    const verifiedCustomer = await this.prisma.customer.findFirst({
      where: { id: createOrderWithoutStripeDto.order.customerId },
    });

    if (!verifiedCustomer) {
      throw new HttpException(
        'Customer does not match the driverID',
        HttpStatus.CONFLICT,
      );
    }

    const customerAddress = await this.customerAddressService.findOne(
      createOrderWithoutStripeDto.order.customerAddressId,
    );

    const orderNumberResult = generateOrderNumber(customerAddress);

    // Assign the generated orderNumber to the orderNumber field
    createOrderWithoutStripeDto.order.orderNumber = orderNumberResult;

    // Creating an Order object
    const {
      customerId,
      orderNumber,
      asap,
      customerAddressId,
      deliveryDate,
      deliveryNote,
    } = createOrderWithoutStripeDto.order;

    try {
      const result = await this.prisma.$transaction(async () => {
        const order = await this.prisma.order.create({
          data: {
            orderNumber,
            customerId,
            asap,
            deliveryDate,
            customerAddressId,
            deliveryNote,
            deliveryFee: createOrderWithoutStripeDto.order.deliveryFee,
          },
          include: { customer: true, customerAddress: true },
        });

        if (!order) {
          throw new Error('Order is not created');
        }

        // Looping to all stores and items and creating order-items, payments, and transfers
        const { orderSubtotal, storeOrdersWithOrderLines } =
          await this.loopThroughStores(
            order,
            createOrderWithoutStripeDto.orderItemsPerStore,
            language,
          );

        // Check if the customer has sufficient credit for the order
        const totalOrderPayment = new Prisma.Decimal(
          (
            orderSubtotal + createOrderWithoutStripeDto.order.deliveryFee
          ).toFixed(2),
        );

        const customerCYSCredit = await this.customerService.getCYSCredit(
          createOrderWithoutStripeDto.order.customerId,
        );

        if (customerCYSCredit.lessThan(totalOrderPayment)) {
          throw new Error('Insufficient CYS credit');
        }

        await this.walletTransactionService.create({
          customerId: createOrderWithoutStripeDto.order.customerId,
          amount: Number(totalOrderPayment),
          walletTransactionType: WalletTransactionType.decrease,
          description: `Delivery credits used from ${order.orderNumber}`,
          orderId: order.id,
        });

        const updatedDriver = await this.customerService.updateWalletBalance(
          createOrderWithoutStripeDto.order.customerId,
          totalOrderPayment,
          'decrease',
        );

        return {
          order,
          orderPayment: {
            total: totalOrderPayment,
            orderSubtotal: orderSubtotal,
          },
          updatedDriver,
          storeOrdersWithOrderLines,
        };
      });

      if (result) {
        try {
          await this.sendgridService.sendOrderConfirmationEmail(
            result.order.customer.email,
            {
              orderNumber: result.order.orderNumber,
              customerDetails: {
                name: result.order.customer.name,
                address: result.order.customerAddress.formattedAddress,
              },
              deliveryFee: result.order.deliveryFee,
              subtotal: result.orderPayment.orderSubtotal,
              total: Number(result.orderPayment.total),
              orders: result.storeOrdersWithOrderLines,
            },
          );
        } catch (error) {
          console.log(error.message);
        }

        return {
          ...result,
          driverWalletBalance: result.updatedDriver.walletBalance,
        };
      } else {
        throw new Error('Order placement failed');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findOneOrder(query): Promise<Order> {
    return this.prisma.order.findUniqueOrThrow(query);
  }

  async findAllByCustomer(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      select: {
        id: true,
        customerId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        customerPayment: { select: { total: true } },
        storeOrder: {
          select: {
            store: { select: { name: true } },
            _count: {
              select: { orderLines: { where: { quantity: { gt: 0 } } } },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async loopThroughStores(
    order: Order,
    orderItemsPerStore: storeInterface[],
    language: Language,
  ) {
    let orderSubtotal = 0;
    const storeOrdersWithOrderLines = []; // Array to store each storeOrder with its corresponding orderLines

    await Promise.all(
      orderItemsPerStore.map(async (store) => {
        const generateNanoid = customAlphabet(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
          5,
        );
        const pickUpCode = generateNanoid();
        const storeOrder = await this.storeOrderService.create({
          orderId: order.id,
          storeId: store.storeId,
          pickUpCode,
          storeNote: store?.storeNote,
        });

        if (!storeOrder) {
          throw new Error('Store Order creation failed');
        }

        const createdOrderLines = []; // Array to store the orderLines for the current storeOrder

        await Promise.all(
          store.items.map(async (item) => {
            const product = await this.prisma.product.findUnique({
              where: { id: item.productId },
            });
            if (product) {
              const orderLine = await this.orderLineService.create(
                {
                  storeOrderId: storeOrder.id,
                  productId: product.id,
                  quantity: item.quantity,
                  totalPrice: product.price * item.quantity,
                },
                language,
              );
              createdOrderLines.push(orderLine); // Add the created orderLine to the array

              orderSubtotal += orderLine.total;
            } else {
              throw new Error('There is no product found with the given ID');
            }
          }),
        );

        const storeTotal = createdOrderLines.reduce(function (acc, product) {
          return acc + product.total;
        }, 0);

        storeOrdersWithOrderLines.push({
          storeName: storeOrder.store.name,
          orderLines: createdOrderLines,
          storeTotal,
        }); // Add the storeOrder with its orderLines to the array
      }),
    );

    return { orderSubtotal, storeOrdersWithOrderLines };
  }

  findPendingOrders() {
    return this.prisma.order.findMany({
      where: {
        notificationSent: false,
        status: {
          in: [Status.processing, Status.picking, Status.picked],
        },
        driverId: null,
      },
      include: { storeOrder: true },
    });
  }

  findOrdersWithNoDriver() {
    return this.prisma.order.findMany({
      where: {
        notificationSent: true,
        status: { in: [Status.processing, Status.picking, Status.picked] },
        notificationCYSSent: false,
        driverId: null,
      },
    });
  }

  /** This function will be called to update the status of Order
   *
   * @param id id of the order that will be updated
   * @param status status of the order that will be updated
   * @returns Updated Order Object
   */
  updateOrderStatus(id: string, status: Status) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  /** This function will update the order status to delivery and also update
   * the pickup time of orderTrip.
   * @param id
   * @returns updated Order with delivery status
   */
  async updateStatusToDeliveryWithOrderTrip(id: string) {
    const order = await this.prisma.order.update({
      where: { id },
      include: { orderTrip: true },
      data: {
        status: Status.delivery,
      },
    });
    await this.orderTripService.updatePickupTime(order.orderTrip.id);

    return order;
  }

  /**
   *
   * @param id id of the order that will be updated
   * @returns Updated Order Object with storeOrder
   */
  async updateOrderStatusToCompleted(id: string) {
    const updatedOrderDetails = await this.prisma.$transaction(async () => {
      try {
        const order = await this.prisma.order.findUniqueOrThrow({
          where: { id, status: Status.delivery },
          include: { storeOrder: true, orderTrip: true },
        });

        const storeOrderIds = order.storeOrder.map(({ id }) => id);

        await this.storeOrderService.updateMany({
          where: { id: { in: storeOrderIds }, status: Status.delivery },
          data: { status: Status.completed },
        });

        const updatedOrder = await this.prisma.order.update({
          where: { id, status: Status.delivery },
          data: { status: Status.completed },
          include: { storeOrder: true },
        });

        if (!updatedOrder) {
          throw new Error('Order update error');
        }
        await this.orderTripService.updateDeliveredTime(order.orderTrip.id);

        return updatedOrder;
      } catch (error) {
        console.log(error.message);
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    });

    if (!updatedOrderDetails) {
      throw new HttpException('Order update failed', HttpStatus.CONFLICT);
    }

    const updatedDriverDetails = await this.prisma.$transaction(async () => {
      try {
        const driver = await this.driverService.findOne(
          updatedOrderDetails.driverId,
        );

        if (!driver) {
          throw new Error('Driver not found');
        }

        const walletTransaction = await this.walletTransactionService.create({
          customerId: driver.customerId,
          amount: updatedOrderDetails.deliveryFee,
          walletTransactionType: WalletTransactionType.increase,
          description: `Delivery credits from ${updatedOrderDetails.orderNumber}`,
          orderId: updatedOrderDetails.id,
        });

        if (!walletTransaction) {
          throw new Error('Wallet transaction creation failed');
        }

        const updatedCustomer = await this.customerService.updateWalletBalance(
          walletTransaction.customerId,
          new Prisma.Decimal(updatedOrderDetails.deliveryFee.toFixed(2)),
          'increase',
        );

        return updatedCustomer;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    });

    return { updatedOrderDetails, updatedDriverDetails };
  }

  updateStatusToCancelled(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: Status.canceled,
        notificationSent: true,
        notificationTime: new Date(),
      },
    });
  }

  /** This function will be called to update the status of Order and also updating/sending notification
   *
   * @param id id of the order that will be updated
   * @param status status of the order that will be updated
   * @returns Updated Order Object
   */
  updateOrderStatusWithNotification(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        notificationSent: true,
        notificationTime: new Date(),
      },
    });
  }

  updateOrderCysNotification(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { notificationCYSSent: true },
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  /**This will return a order to show the customer their complete order details
   *
   * @param id
   * @param language
   * @returns
   */
  async findOneOrderWithCompleteDetails(id: string, language: Language) {
    const order = await this.prisma.order.findFirst({
      where: { id },
      include: {
        storeOrder: {
          include: {
            store: true,
            orderLines: {
              include: {
                product: {
                  include: {
                    productTranslations: {
                      where: { language: language },
                      select: { name: true, unit: true },
                    },
                    images: { select: { url: true } },
                  },
                },
              },
            },
          },
        },
        customerAddress: true,
        driver: {
          select: {
            name: true,
            phoneNumber: true,
            id: true,
            imageUrl: true,
            orders: {
              include: { orderReview: { select: { deliverySatisfied: true } } },
            },
          },
        },
        orderReview: {
          select: {
            deliveryAdditionalComments: true,
            deliverySatisfied: true,
            id: true,
          },
        },
      },
    });

    const totalOrderPayment = order.storeOrder.reduce((total, store) => {
      const storeTotal = store.orderLines
        .filter(
          (orderLine) =>
            orderLine.status === 'accepted' ||
            orderLine.status === 'noResponse',
        )
        .reduce(
          (totalEachStore, orderLine) => totalEachStore + orderLine.totalPrice,
          0,
        );

      return total + storeTotal;
    }, 0);

    return { ...order, totalOrderPayment };
  }

  /** This function will find one available order with no driver
   * Also returns an order that depends on the number of product quantity so drivers with bicycles are not going to receive 15+ quantity orders
   * @param driverId
   */
  async findOneAvailableOrderWithNoDriver(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    const orderQuery = {
      where: {
        status: {
          in: [Status.processing, Status.picking, Status.picked],
        },
        driverId: null,
        orderDrivers: {
          some: {
            AND: [
              { status: OrderDriverStatus.noResponse },
              { driverId: driverId },
            ],
          },
        },
        customer: { userId: { not: driver.userId } },
      },
      select: {
        id: true,
        orderNumber: true,
        customerAddress: { select: { latitude: true, longitude: true } },
        storeOrder: {
          select: {
            store: {
              select: { latitude: true, longitude: true, name: true },
            },
            orderLines: { select: { quantity: true } },
          },
        },
      },
      orderBy: { createdAt: Prisma.SortOrder.asc },
    };

    if (driver.vehicleType === 'car') {
      const findOrderResult = await this.prisma.order.findFirst(orderQuery);
      console.log('CAR = inside the finding pending order', {
        findOrderResult,
        driver,
      });
      return findOrderResult;
    } else {
      const orders = await this.prisma.order.findMany(orderQuery);
      console.log('BYCYCLE = inside the finding pending order', {
        orders,
        driver,
      });
      return orders.find((order) => {
        const orderQuantity = order.storeOrder.reduce(
          (curr, { orderLines }) =>
            curr +
            orderLines.reduce(
              (currQuantity, { quantity }) => currQuantity + quantity,
              0,
            ),
          0,
        );
        return orderQuantity < 15;
      });
    }
  }

  /** This will be called when the driver wants to get the details of the accepted Order.
   *
   * @param driverId driverId for validation that the driver has an active order
   * @param language language for product name language.
   * @returns will return the customer details, all store orders and each product
   */
  async findAcceptedOrderDetailsForDriver(
    driverId: string,
    language: Language,
  ) {
    return this.prisma.order.findFirst({
      where: {
        driverId,
        orderDrivers: {
          some: {
            driverId,
            status: OrderDriverStatus.accepted,
            order: { driverId },
          },
        },
        NOT: {
          status: {
            in: [Status.pending, Status.completed],
          },
        },
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        deliveryNote: true,
        customer: {
          select: {
            name: true,
            phoneNumber: true,
          },
        },
        customerAddress: {
          select: {
            latitude: true,
            longitude: true,
            formattedAddress: true,
            address: true,
          },
        },
        storeOrder: {
          orderBy: { status: 'desc' },
          select: {
            id: true,
            pickUpCode: true,
            status: true,
            store: {
              select: {
                deliveryNote: true,
                latitude: true,
                longitude: true,
                name: true,
                address: true,
                phoneNumber: true,
                logoImageUrl: true,
              },
            },
            orderLines: {
              select: {
                product: {
                  select: {
                    productTranslations: {
                      where: { language },
                      select: { name: true, unit: true },
                    },
                    images: true,
                  },
                },
                quantity: true,
                totalPrice: true,
                id: true,
                status: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /** This function will be called to check if the customer has a completed order that has no reviews yet. Once the user see it, it won't be fetched by this query.
   *
   * @param orderId
   * @param customerId
   * @returns
   */
  async findPendingOrderReviews(customerId: string) {
    return await this.prisma.order.findMany({
      where: {
        customerId,
        orderReview: null,
        status: Status.completed,
        driverId: { not: null },
      },
      select: {
        driver: { select: { id: true, imageUrl: true, name: true } },
        id: true,
        orderReview: true,
      },
      orderBy: { updatedAt: 'asc' },
    });
  }
}
