import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByUserId(userId: string): Promise<void> {
    await this.prisma.admin.findUniqueOrThrow({
      where: {
        userId,
      },
    });
  }
}
