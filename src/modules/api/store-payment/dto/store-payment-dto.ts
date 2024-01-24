import { Status } from '@prisma/client';

export class StorePaymentDto {
  storeOrderId: string;
  storeId: string;
  subtotal: number;
  platformFee: number;
  total: number;
  stripeStatus: Status;
}
