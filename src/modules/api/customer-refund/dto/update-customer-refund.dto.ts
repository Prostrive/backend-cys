import { PartialType } from '@nestjs/swagger';
import { CreateCustomerRefundDto } from './create-customer-refund.dto';

export class UpdateCustomerRefundDto extends PartialType(
  CreateCustomerRefundDto,
) {}
