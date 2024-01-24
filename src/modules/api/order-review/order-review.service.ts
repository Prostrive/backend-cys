import { Injectable } from '@nestjs/common';
import { CreateOrderReviewDto } from './dto/create-order-review.dto';
import { UpdateOrderReviewDto } from './dto/update-order-review.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';

@Injectable()
export class OrderReviewService {
  constructor(private prisma: PrismaService) {}
  create(createOrderReviewDto: CreateOrderReviewDto) {
    return this.prisma.orderReview.create({ data: createOrderReviewDto });
  }

  findAll() {
    return this.prisma.orderReview.findMany({});
  }

  findOne(id: string) {
    return this.prisma.orderReview.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateOrderReviewDto: UpdateOrderReviewDto) {
    return this.prisma.orderReview.update({
      where: { id, deliverySatisfied: null, deliveryAdditionalComments: null },
      data: updateOrderReviewDto,
    });
  }

  remove(id: string) {
    return this.prisma.orderReview.delete({ where: { id } });
  }
}
