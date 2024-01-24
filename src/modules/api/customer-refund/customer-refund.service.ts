import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCustomerRefundDto } from './dto/create-customer-refund.dto';
import { UpdateCustomerRefundDto } from './dto/update-customer-refund.dto';

@Injectable()
export class CustomerRefundService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerRefundDto: CreateCustomerRefundDto) {
    return this.prisma.customerRefund.create({ data: createCustomerRefundDto });
  }

  findAll() {
    return this.prisma.customerRefund.findMany();
  }

  findOne(id: string) {
    return this.prisma.customerRefund.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateCustomerRefundDto: UpdateCustomerRefundDto) {
    return this.prisma.customerRefund.update({
      where: { id },
      data: updateCustomerRefundDto,
    });
  }

  remove(id: string) {
    return this.prisma.customerRefund.delete({ where: { id } });
  }
}
