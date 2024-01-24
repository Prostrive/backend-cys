import { PartialType } from '@nestjs/swagger';
import { CreateStoreOrderDto } from './create-store-order.dto';

export class UpdateStoreOrderDto extends PartialType(CreateStoreOrderDto) {}
