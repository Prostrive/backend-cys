import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { OrderLineService } from '../order-line/order-line.service';
import { StripeService } from '../stripe/stripe.service';
import { StoreOrderService } from '../store-order/store-order.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { OrderTripService } from '../order-trip/order-trip.service';
import { CustomerAddressService } from '../customer-address/customer-address.service';
import { CustomerService } from '../customer/customer.service';
import { DriverService } from '../driver/driver.service';
import { GoogleMapsService } from '@/modules/common/google-maps/google-maps.service';
import { WalletTransactionService } from '../wallet-transaction/wallet-transaction.service';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    CustomerPaymentService,
    OrderLineService,
    StripeService,
    StoreOrderService,
    StoreOrderPaymentService,
    CustomerRefundService,
    ExpoService,
    OrderTripService,
    CustomerAddressService,
    CustomerService,
    DriverService,
    GoogleMapsService,
    WalletTransactionService,
    SendgridService,
  ],
  exports: [OrderService],
})
export class OrderModule {}
