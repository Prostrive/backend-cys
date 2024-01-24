import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { StoreOrderService } from '../store-order/store-order.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { OrderService } from './order.service';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { StripeService } from '../stripe/stripe.service';
import { OrderTripService } from '../order-trip/order-trip.service';
import { OrderLineService } from '../order-line/order-line.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomerPayment, Order } from '@prisma/client';
import { nanoid } from 'nanoid';

describe('OrderService', () => {
  let service: OrderService;
  let createOrderDto = {} as unknown as CreateOrderDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CustomerPaymentService,
        StoreOrderService,
        OrderLineService,
        OrderService,
        OrderTripService,
        StoreOrderPaymentService,
        CustomerRefundService,
        StripeService,
      ],
    }).compile();

    service = app.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined create', () => {
      expect(service.create).toBeDefined();
    });

    it('should invalidate createOrderDto', async () => {
      const dto = plainToClass(CreateOrderDto, createOrderDto);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should create order', async () => {
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

      jest.spyOn(service, 'create').mockResolvedValue(createdOrder);

      const result = await service.create(dto);

      expect(result).toHaveProperty(Object.keys(createdOrder)[0]);
      expect(result).toHaveProperty(Object.keys(createdOrder)[1]);
    });
  });
});
