import { Module } from '@nestjs/common';
import { StoreOrderService } from './store-order.service';
import { StoreOrderController } from './store-order.controller';
import { StripeService } from '../stripe/stripe.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { OrderTripService } from '../order-trip/order-trip.service';
import { OrderService } from '../order/order.service';
import { DriverService } from '../driver/driver.service';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { OrderLineService } from '../order-line/order-line.service';
import { CustomerAddressService } from '../customer-address/customer-address.service';
import { CustomerService } from '../customer/customer.service';
import { WalletTransactionService } from '../wallet-transaction/wallet-transaction.service';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { GoogleMapsService } from '@/modules/common/google-maps/google-maps.service';

@Module({
  controllers: [StoreOrderController],
  providers: [
    StoreOrderService,
    StripeService,
    StoreOrderPaymentService,
    CustomerRefundService,
    OrderTripService,
    OrderService,
    DriverService,
    CustomerPaymentService,
    OrderLineService,
    CustomerAddressService,
    CustomerService,
    WalletTransactionService,
    SendgridService,
    ExpoService,
    GoogleMapsService,
  ],
  exports: [StoreOrderService],
})
export class StoreOrderModule {}
