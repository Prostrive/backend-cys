import { OrderDriverStatus } from '@prisma/client';

export class CreateOrderDriverDto {
  orderId: string;
  driverId: string;
  status?: OrderDriverStatus;
}
