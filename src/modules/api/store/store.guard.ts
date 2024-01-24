import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class StoreGuard extends AuthGuard('jwt') {
  constructor(private prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwt = new JwtService({
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const { user_id: userId }: any =
      jwt.decode(request.headers.authorization?.substr(7)) ?? {};

    if (userId) {
      const employee = await this.prisma.storeEmployee.findUnique({
        where: { userId },
        select: { storeId: true },
      });

      if (employee) {
        request.storeId = employee.storeId;
        return true;
      }

      const manager = await this.prisma.storeManager.findUnique({
        where: { userId },
        select: { storeId: true },
      });

      if (manager) {
        request.storeId = manager.storeId;
        return true;
      }
    }

    return false;
  }
}
