import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { StorePaymentDto } from './dto/store-payment-dto';

@Injectable()
export class StoreOrderPaymentService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  async createStoreOrderPayment(storePaymentObject: StorePaymentDto) {
    return this.prisma.storeOrderPayment.create({
      data: storePaymentObject,
    });
  }
}
