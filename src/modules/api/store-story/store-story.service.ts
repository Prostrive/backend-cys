import { Injectable } from '@nestjs/common';
import { CreateStoreStoryDto } from './dto/create-store-story.dto';
import { UpdateStoreStoryDto } from './dto/update-store-story.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';

@Injectable()
export class StoreStoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStoreStoryDto: CreateStoreStoryDto) {
    return this.prismaService.storeStory.create({ data: createStoreStoryDto });
  }

  findAll() {
    return this.prismaService.storeStory.findMany();
  }

  findOneByStoreId(storeId: string) {
    return this.prismaService.storeStory.findUnique({
      where: { storeId },
    });
  }

  update(
    id: string,
    storeId: string,
    updateStoreStoryDto: UpdateStoreStoryDto,
  ) {
    return this.prismaService.storeStory.update({
      where: { id, storeId },
      data: updateStoreStoryDto,
    });
  }

  remove(id: string, storeId: string) {
    return this.prismaService.storeStory.delete({ where: { id, storeId } });
  }
}
