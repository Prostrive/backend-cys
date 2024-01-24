import { PartialType } from '@nestjs/swagger';
import { CreateStoreOrderLineDto } from './create-order-item.dto';

export class UpdateOrderLineDto extends PartialType(CreateStoreOrderLineDto) {}

export class UpdateStatusOrderLineDto {
  orderLineIds: string[];
  storeOrderId: string;
}
