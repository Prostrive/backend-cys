import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
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
      const isAdmin = await this.prisma.admin.count({
        where: {
          userId,
        },
      });

      return !!isAdmin;
    }

    return false;
  }
}
