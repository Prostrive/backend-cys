import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCustomerSearchDto } from './dto/create-customer-search.dto';
import { UpdateCustomerSearchDto } from './dto/update-customer-search.dto';

@Injectable()
export class CustomerSearchService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCustomerSearchDto: CreateCustomerSearchDto) {
    return this.prisma.customerSearch.create({
      data: createCustomerSearchDto,
    });
  }

  findAll() {
    return this.prisma.customerSearch.findMany();
  }

  findOne(id: string) {
    return this.prisma.customerSearch.findUnique({
      where: {
        id,
      },
    });
  }

  findCustomerSearchesByCustomerId(customerId: string) {
    return this.prisma.customerSearch.findMany({
      where: {
        customerId,
      },
      distinct: ['searchTerm'],
      take: 10,
    });
  }

  update(id: string, updateCustomerSearchDto: UpdateCustomerSearchDto) {
    return this.prisma.customerSearch.update({
      where: {
        id,
      },
      data: updateCustomerSearchDto,
    });
  }

  remove(id: string) {
    return this.prisma.customerSearch.delete({
      where: {
        id,
      },
    });
  }
}
