import { Injectable } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppSettingsService {
  constructor(private prisma: PrismaService) {}
  /** This function will be called to find if there is an existing appSetting. If false, it will create and if it exist, it will update.
   * NOTE: You can only create one hence it will return an error if you tried to create with other query.
   * @param createAppSettingDto
   * @returns appsetting object
   */
  async createOrUpdate(createAppSettingDto: CreateAppSettingDto) {
    const { deliveryFee, isActive } = createAppSettingDto;
    const data: Prisma.AppSettingsCreateInput = {
      deliveryFee,
      isActive,
    };

    const existingAppSettings = await this.prisma.appSettings.findUnique({
      where: { id: 1 },
    });

    if (existingAppSettings) {
      return this.prisma.appSettings.update({ where: { id: 1 }, data: data });
    }

    return this.prisma.appSettings.create({
      data: {
        id: 1,
        deliveryFee: deliveryFee ?? 3,
        isActive: isActive ?? false,
      },
    });
  }

  findOne() {
    return this.prisma.appSettings.findUniqueOrThrow({
      where: { id: 1 },
      select: { deliveryFee: true, isActive: true },
    });
  }

  remove() {
    return this.prisma.appSettings.delete({ where: { id: 1 } });
  }
}
