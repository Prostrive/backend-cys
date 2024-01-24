import { PartialType } from '@nestjs/swagger';
import { CreateStoreEmployeeDto } from './create-store-employee.dto';

export class UpdateStoreEmployeeDto extends PartialType(
  CreateStoreEmployeeDto,
) {}
