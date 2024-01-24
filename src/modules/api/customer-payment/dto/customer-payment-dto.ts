import { Status } from '@prisma/client';

export class CustomerPaymentDto {
  orderId: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  stripeTransferGroup: string;
  stripePaymentIntent: string;
  status?: Status;
}
