import { PartialType } from '@nestjs/swagger';
import { CreateStoreManagerDto } from './create-store-manager.dto';

export class UpdateStoreManagerDto extends PartialType(CreateStoreManagerDto) {}
