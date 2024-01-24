import { PartialType } from '@nestjs/swagger';
import { CreateOrderDriverDto } from './create-order-driver.dto';

export class UpdateOrderDriverDto extends PartialType(CreateOrderDriverDto) {}
