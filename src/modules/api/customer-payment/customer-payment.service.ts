import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CustomerPaymentDto } from './dto/customer-payment-dto';

@Injectable()
export class CustomerPaymentService {
  constructor(private prisma: PrismaService) {}
  createCustomerPayment(orderPaymentObject: CustomerPaymentDto) {
    if (
      !orderPaymentObject.stripePaymentIntent ||
      !orderPaymentObject.stripeTransferGroup
    ) {
      throw new HttpException('No payment intent', HttpStatus.CONFLICT);
    }
    return this.prisma.customerPayment.create({
      data: orderPaymentObject,
    });
  }

  updateStatus(id: string, status: Status) {
    return this.prisma.customerPayment.update({
      where: { id },
      data: { status: status },
    });
  }
}
