import { PartialType } from '@nestjs/swagger';
import { CreateCustomerSearchDto } from './create-customer-search.dto';

export class UpdateCustomerSearchDto extends PartialType(
  CreateCustomerSearchDto,
) {}
