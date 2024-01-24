import { PartialType } from '@nestjs/swagger';
import { CreateOrderTripDto } from './create-order-trip.dto';

export class UpdateOrderTripDto extends PartialType(CreateOrderTripDto) {}
