import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { OrderLineService } from '../order-line/order-line.service';
import { StripeService } from '../stripe/stripe.service';
import { StoreOrderService } from '../store-order/store-order.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { OrderTripService } from '../order-trip/order-trip.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { CustomerPayment, Order } from '@prisma/client';
import { nanoid } from 'nanoid';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderDto = {} as unknown as CreateOrderDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        CustomerPaymentService,
        StoreOrderService,
        OrderLineService,
        OrderTripService,
        StoreOrderPaymentService,
        PrismaService,
        CustomerRefundService,
        StripeService,
        OrderTripService,
      ],
    }).compile();

    controller = app.get<OrderController>(OrderController);
  });

  it('should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined create', () => {
      expect(controller.create).toBeDefined();
    });

    it('should invalidate createOrderDto', async () => {
      const dto = plainToClass(CreateOrderDto, createOrderDto);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should return an object with order and orderPayment properties', async () => {
      createOrderDto = {
        order: {
          customerAddressId: nanoid(),
          asap: false,
          orderNumber: '',
          customerId: nanoid(),
          deliveryDate: new Date().toISOString(),
          stripePaymentIntent: '',
          stripeTransferGroup: '',
        },
        orderItemsPerStore: [
          {
            storeId: nanoid(),
            stripeId: nanoid(),
            items: [
              {
                productId: nanoid(),
                quantity: 1,
              },
            ],
          },
        ],
      };

      const dto = plainToClass(CreateOrderDto, createOrderDto);
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);

      const createdOrder = {
        order: {} as Order,
        orderPayment: {} as CustomerPayment,
      };

      jest.spyOn(controller, 'create').mockResolvedValue(createdOrder);

      const result = await controller.create(dto);

      expect(result).toHaveProperty(Object.keys(createdOrder)[0]);
      expect(result).toHaveProperty(Object.keys(createdOrder)[1]);
    });
  });
});
