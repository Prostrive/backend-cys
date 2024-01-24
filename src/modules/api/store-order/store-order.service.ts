import { PrismaService } from '@/modules/common/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  Language,
  ProductStatus,
  Status,
  StoreOrderLine,
} from '@prisma/client';
import { roundToTwoDecimals } from '@/utils/numbers';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateStoreOrderDto } from './dto/create-store-order.dto';
import { UpdateStoreOrderDto } from './dto/update-store-order.dto';
import { OrderTripService } from '../order-trip/order-trip.service';
import { translationFilter } from '@/utils/translation';
import { OrderService } from '../order/order.service';

@Injectable()
export class StoreOrderService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private readonly storeOrderPaymentService: StoreOrderPaymentService,
    private readonly customerRefundService: CustomerRefundService,
    private readonly stripeService: StripeService,
    private readonly orderTripService: OrderTripService,
  ) {}

  create(createStoreOrderDto: CreateStoreOrderDto) {
    return this.prisma.storeOrder.create({
      data: createStoreOrderDto,
      include: { store: { select: { name: true } } },
    });
  }

  findAll(storeId?: string) {
    return this.prisma.storeOrder.findMany({
      where: {
        ...(storeId ? { storeId } : {}),
      },
      include: {
        order: {
          select: {
            orderNumber: true,
          },
        },
        orderLines: {
          include: {
            product: true,
          },
        },
        storePayment: {
          select: {
            total: true,
          },
        },
        _count: {
          select: {
            orderLines: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, language: string) {
    return this.prisma.storeOrder.findUniqueOrThrow({
      where: { id },
      include: {
        order: {
          include: {
            customer: true,
            customerAddress: true,
            customerPayment: true,
          },
        },
        orderLines: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  select: {
                    url: true,
                  },
                },
                productTranslations: {
                  where: {
                    ...(await translationFilter(
                      language as Language,
                      this.prisma.productCategoryTranslation,
                    )),
                  },
                },
              },
            },
          },
        },
        store: { select: { latitude: true, longitude: true, address: true } },
        storePayment: true,
      },
    });
  }

  update(id: string, updateStoreOrderDto: UpdateStoreOrderDto) {
    return this.prisma.storeOrder.update({
      where: { id },
      data: { ...updateStoreOrderDto },
    });
  }

  updateMany(query) {
    return this.prisma.storeOrder.updateMany(query);
  }

  /** This is a universal function for updating the store order status
   *
   * @param id
   * @param status
   * @returns
   */
  updateStatus(id: string, status: Status) {
    return this.prisma.storeOrder.update({
      where: { id },
      data: { status },
    });
  }

  /** This is called when the store accepts the whole order and
   * update the status to processing
   * @param id storeOrder id
   * @returns store order with orderlines
   */
  async acceptStoreOrder(id: string) {
    const storeOrder = await this.prisma.storeOrder.update({
      where: { id, status: Status.pending },
      include: {
        orderLines: true,
        order: {
          select: {
            deliveryDate: true,
            id: true,
            storeOrder: { select: { status: true } },
          },
        },
      },
      data: { status: Status.processing },
    });

    const validStatuses = [
      Status.processing,
      Status.picking,
      Status.picked,
      Status.delivery,
      Status.canceled,
    ];

    const isOrderProcessing = storeOrder.order.storeOrder.every(
      (innerStoreOrder) => {
        return (validStatuses as Status[]).includes(
          innerStoreOrder.status as Status,
        );
      },
    );

    if (isOrderProcessing) {
      await this.orderService.updateOrderStatus(
        storeOrder.order.id,
        Status.processing,
      );
    }

    return storeOrder;
  }

  /** This is when the store rejects the order and refund the customer
   *
   * @param id storeOrder id
   * @returns customerRefundTotal, customerRefund and stripeRefund object
   */
  async cancelStoreOrder(id: string) {
    const { orderLines, order } = await this.prisma.storeOrder.findUnique({
      where: { id },
      include: {
        orderLines: true,
        order: {
          select: {
            id: true,
            customerPayment: {
              select: {
                stripePaymentIntent: true,
                stripeTransferGroup: true,
              },
            },
            deliveryFee: true,
          },
        },
      },
    });

    const storeOrder = await this.prisma.storeOrder.update({
      where: { id },
      data: { status: Status.canceled },
      include: {
        order: {
          select: { id: true, storeOrder: { select: { status: true } } },
        },
      },
    });

    const isOrderCancelled = storeOrder.order.storeOrder.every(
      (innerStoreOrder) => innerStoreOrder.status === Status.canceled,
    );

    if (isOrderCancelled) {
      await this.orderService.updateOrderStatus(
        storeOrder.order.id,
        Status.canceled,
      );
    } else {
      const validStatuses = [
        Status.processing,
        Status.picking,
        Status.picked,
        Status.delivery,
        Status.canceled,
      ];

      const isOrderNotPending = storeOrder.order.storeOrder.every(
        (innerStoreOrder) => {
          return (validStatuses as Status[]).includes(
            innerStoreOrder.status as Status,
          );
        },
      );

      if (isOrderNotPending) {
        const leastStatus = storeOrder.order.storeOrder.reduce(
          (prev: any, curr: any) => {
            const prevIndex = validStatuses.indexOf(prev.status);
            const currIndex = validStatuses.indexOf(curr.status);
            return currIndex < prevIndex ? curr : prev;
          },
        );

        await this.orderService.updateOrderStatus(
          storeOrder.order.id,
          leastStatus.status,
        );
      }
    }

    const customerRefundTotal = orderLines.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    if (customerRefundTotal === 0) {
      throw new Error('There is no order line in this store order');
    }

    // 1. Create a Customer Refund

    const customerRefund = await this.customerRefundService.create({
      orderId: order.id,
      status: 'processing',
      total: customerRefundTotal + (isOrderCancelled ? order.deliveryFee : 0),
    });

    if (!customerRefund) {
      throw new Error('customer refund object creation failed');
    }

    // 2. Transfer the refund to stripe
    const stripeRefund = await this.stripeService.createRefund(
      order.customerPayment.stripePaymentIntent,
      customerRefund.total,
    );
    if (stripeRefund.status === 'succeeded')
      await this.prisma.customerRefund.update({
        where: { id: customerRefund.id },
        data: { status: Status.completed },
      });

    return { customerRefundTotal, customerRefund, stripeRefund };
  }

  /** This function will handle updating the status of store order to picking and also ensures that the store order is accepted or in processing status
   *
   * @param id id of the storeOrder that will be updated
   * @returns updated storeOrder object with picking status
   */
  async updateStatusToPicking(id: string) {
    const storeOrder = await this.prisma.storeOrder.update({
      where: { id, status: Status.processing },
      data: { status: Status.picking },
      include: {
        order: {
          select: { id: true, storeOrder: { select: { status: true } } },
        },
      },
    });
    const validStatuses = [
      Status.picking,
      Status.picked,
      Status.delivery,
      Status.canceled,
    ];

    const isOrderPicking = storeOrder.order.storeOrder.every(
      (innerStoreOrder) => {
        return (validStatuses as Status[]).includes(
          innerStoreOrder.status as Status,
        );
      },
    );

    if (isOrderPicking) {
      await this.orderService.updateOrderStatus(
        storeOrder.order.id,
        Status.picking,
      );
    }

    return storeOrder;
  }

  /** This function will handle updating the status of store order to picked and also ensures that the order has a driver existing or orderTrip.
   * This is also when the store reject some of the orderLine and refund the customer.
   * @param id id of the storeOrder that will be updated
   * @returns updated storeOrder object with picked status
   */
  async updateStatusToPicked(id: string) {
    const {
      orderLines,
      id: storeOrderId,
      storeId: storeId,
      order,
      store,
    } = await this.prisma.storeOrder.findUniqueOrThrow({
      where: {
        id,
        status: Status.picking,
      },
      include: {
        orderLines: true,
        store: { select: { stripeId: true } },
        order: {
          select: {
            customerPayment: {
              select: {
                stripePaymentIntent: true,
                stripeTransferGroup: true,
              },
            },
            deliveryDate: true,
            id: true,
          },
        },
      },
    });

    if (!storeOrderId) {
      throw new HttpException('No store order found', HttpStatus.CONFLICT);
    }
    if (orderLines.length === 0) {
      throw new HttpException('No order lines found', HttpStatus.CONFLICT);
    }

    const allAcceptedOrRejected = orderLines.every(
      (orderLine) => orderLine.status !== ProductStatus.noResponse,
    );

    if (!allAcceptedOrRejected) {
      throw new HttpException(
        'All order lines should be accepted or rejected',
        HttpStatus.CONFLICT,
      );
    }

    const { storePayment } = await this.getAcceptedOrderLine(
      orderLines,
      storeOrderId,
      storeId,
      order.customerPayment.stripeTransferGroup,
      store.stripeId,
      order.deliveryDate,
    );

    if (storePayment) {
      const { customerRefund } = await this.getRejectedOrderLine(
        orderLines,
        order.id,
        order.customerPayment.stripePaymentIntent,
      );
      const storeOrder = await this.prisma.storeOrder.update({
        where: {
          id,
          status: Status.picking,
          orderLines: {
            every: { status: { not: ProductStatus.noResponse } },
          },
        },
        include: {
          order: {
            include: { storeOrder: true, orderTrip: true },
          },
        },
        data: { status: Status.picked },
      });

      const validStatuses = [Status.picked, Status.delivery, Status.canceled];

      const isOrderPicked = storeOrder.order.storeOrder.every(
        (innerStoreOrder) => {
          return (validStatuses as Status[]).includes(
            innerStoreOrder.status as Status,
          );
        },
      );

      if (isOrderPicked) {
        await this.orderService.updateOrderStatus(
          storeOrder.order.id,
          Status.picked,
        );
      }
      return { ...storeOrder, storePayment, customerRefund };
    } else {
      return this.cancelStoreOrder(id);
    }
  }

  /** This function will handle the updating of store order to delivery and it will
   *  return an error if the status is not "picked"
   * @param id  id of the storeOrder that will be updated
   * @param status desired status for the update
   * @returns updated storeOrder object
   */
  async updateStatusToDelivery(id: string, driverId: string) {
    const storeOrder = await this.prisma.storeOrder.update({
      where: {
        id,
        status: Status.picked,
        NOT: { order: { orderTrip: null, driverId: null } },
        order: { driverId, status: Status.picked },
      },
      data: { status: Status.delivery },
      include: {
        order: {
          select: { storeOrder: { select: { status: true } }, id: true },
        },
      },
    });

    const isOrderDelivery = storeOrder.order.storeOrder.every(
      (innerStoreOrder) => {
        return innerStoreOrder.status === Status.delivery;
      },
    );

    if (isOrderDelivery) {
      await this.orderService.updateOrderStatus(
        storeOrder.order.id,
        Status.delivery,
      );
    }
    return storeOrder;
  }

  remove(id: string) {
    return this.prisma.storeOrder.delete({
      where: { id },
    });
  }

  async getAcceptedOrderLine(
    orderLines: StoreOrderLine[],
    storeOrderId: string,
    storeId: string,
    transferGroup: string,
    stripeId: string,
    deliveryDate: Date,
  ) {
    // ACCEPTED ORDER LINES
    const platformFeePercentage = 0.05;
    let subtotal = 0;
    // 1. Get all accepted order line and sum of total prices
    const acceptedOrderLines = orderLines.filter(
      (orderLine) => orderLine.status === 'accepted',
    );
    acceptedOrderLines.forEach((orderLine) => {
      subtotal += orderLine.totalPrice;
    });
    if (acceptedOrderLines.length !== 0) {
      // 2. Create a storeOrderPayment
      const platformFee = subtotal * platformFeePercentage;
      const storePayment =
        await this.storeOrderPaymentService.createStoreOrderPayment({
          storeOrderId,
          storeId,
          subtotal,
          platformFee: roundToTwoDecimals(platformFee),
          total: roundToTwoDecimals(subtotal - platformFee),
          stripeStatus: 'processing',
        });
      if (!storePayment) {
        throw new Error('store payment object creation failed');
      }
      // 3. Create a transfer to store in stripe
      const { transferStore } = await this.stripeService.createTransfer({
        amount: subtotal - platformFee,
        currency: 'eur',
        stripeId: stripeId,
        transferGroup: transferGroup,
      });

      if (transferStore) {
        await this.prisma.storeOrderPayment.update({
          where: { id: storePayment.id },
          data: { stripeStatus: 'completed' },
        });
      }

      return { acceptedOrderLines, storePayment, transferStore };
    } else {
      return { storePayment: null };
    }
  }

  async getRejectedOrderLine(
    orderLines: StoreOrderLine[],
    orderId: string,
    paymentIntent: string,
  ) {
    // REJECTED ORDER LINES
    // 1. Calculate all of rejected orderlines and make a refund
    let customerRefundTotal = 0;
    const rejectedOrderLines = orderLines.filter(
      (orderLine) => orderLine.status === 'rejected',
    );
    if (rejectedOrderLines.length === 0) {
      return { rejectedOrderLines, customerRefundTotal, stripeRefund: {} };
    }

    rejectedOrderLines.forEach((orderLine) => {
      customerRefundTotal += orderLine.totalPrice;
    });

    // 2. Create a Customer Refund
    const customerRefund = await this.customerRefundService.create({
      orderId,
      status: 'processing',
      total: roundToTwoDecimals(customerRefundTotal),
    });
    if (!customerRefund) {
      throw new Error('Customer refund object creation failed');
    }

    // 3. Transfer the refund to stripe
    const stripeRefund = await this.stripeService.createRefund(
      paymentIntent,
      customerRefund.total,
    );

    if (stripeRefund.status === 'succeeded')
      await this.prisma.customerRefund.update({
        where: { id: customerRefund.id },
        data: { status: Status.completed },
      });

    return { rejectedOrderLines, customerRefund, stripeRefund };
  }
}
