import { PartialType } from '@nestjs/swagger';
import { CreateStoreOpeningTimeDto } from './create-store-opening-time.dto';

export class UpdateStoreOpeningTimeDto extends PartialType(
  CreateStoreOpeningTimeDto,
) {}
