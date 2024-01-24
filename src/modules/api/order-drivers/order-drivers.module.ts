import { Module } from '@nestjs/common';
import { OrderDriversService } from './order-drivers.service';
import { OrderDriversController } from './order-drivers.controller';
import { DriverService } from '../driver/driver.service';
import { CustomerService } from '../customer/customer.service';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { GoogleMapsService } from '@/modules/common/google-maps/google-maps.service';
import { OrderService } from '../order/order.service';
import { CustomerPaymentService } from '../customer-payment/customer-payment.service';
import { StoreOrderService } from '../store-order/store-order.service';
import { OrderLineService } from '../order-line/order-line.service';
import { StoreOrderPaymentService } from '../store-payment/store-payment.service';
import { CustomerRefundService } from '../customer-refund/customer-refund.service';
import { StripeService } from '../stripe/stripe.service';
import { OrderTripService } from '../order-trip/order-trip.service';
import { CustomerAddressService } from '../customer-address/customer-address.service';
import { WalletTransactionService } from '../wallet-transaction/wallet-transaction.service';
import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';

@Module({
  controllers: [OrderDriversController],
  providers: [
    OrderDriversService,
    DriverService,
    CustomerService,
    ExpoService,
    GoogleMapsService,
    OrderService,
    CustomerPaymentService,
    StoreOrderService,
    OrderLineService,
    StoreOrderPaymentService,
    CustomerRefundService,
    StripeService,
    OrderTripService,
    CustomerAddressService,
    WalletTransactionService,
    SendgridService,
  ],
  exports: [OrderDriversService],
})
export class OrderDriversModule {}
