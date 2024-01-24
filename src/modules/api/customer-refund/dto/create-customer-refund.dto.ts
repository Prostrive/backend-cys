import { Status } from '@prisma/client';

export class CreateCustomerRefundDto {
  orderId: string;
  total: number;
  status: Status;
}
