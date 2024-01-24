import { PartialType } from '@nestjs/swagger';
import { CreateStoreAdvertisementDto } from './create-store-advertisement.dto';

export class UpdateStoreAdvertisementDto extends PartialType(CreateStoreAdvertisementDto) {}
