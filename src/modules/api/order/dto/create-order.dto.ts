import { IsDefined } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export interface orderInterface {
  orderNumber: string;
  customerId: string;
  cysCredits?: number;
  customerAddressId: string;
  deliveryDate: string;
  deliveryNote?: string;
  asap: boolean;
  stripeTransferGroup: string;
  stripePaymentIntent: string;
  phoneNumber?: string;
  deliveryFee: number;
}

export interface orderWithoutStripeInterface {
  orderNumber: string;
  customerId: string;
  customerAddressId: string;
  deliveryDate: string;
  deliveryNote?: string;
  asap: boolean;
  phoneNumber?: string;
  deliveryFee: number;
}

interface orderLineInterface {
  productId: string;
  quantity: number;
}
export interface storeInterface {
  storeId: string;
  stripeId: string;
  items: orderLineInterface[];
  storeNote?: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDefined()
  order: orderInterface;

  @IsNotEmpty()
  @IsDefined()
  orderItemsPerStore: storeInterface[];
}

export class CreateOrderWithoutStripeDto {
  @IsNotEmpty()
  @IsDefined()
  order: orderWithoutStripeInterface;

  @IsNotEmpty()
  @IsDefined()
  orderItemsPerStore: storeInterface[];
}
