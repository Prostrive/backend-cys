import { PartialType } from '@nestjs/swagger';
import { CreateStoreStoryDto } from './create-store-story.dto';

export class UpdateStoreStoryDto extends PartialType(CreateStoreStoryDto) {}
