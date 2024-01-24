import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { Status } from '@prisma/client';

@Injectable()
export class CustomerAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const addressCount = await this.prisma.customerAddress.count({
      where: { customerId: createCustomerAddressDto.customerId },
    });

    if (addressCount === 0) {
      return this.prisma.customerAddress.create({
        data: { ...createCustomerAddressDto, primary: true },
      });
    }
    return this.prisma.customerAddress.create({
      data: createCustomerAddressDto,
    });
  }

  findAll() {
    return this.prisma.customerAddress.findMany();
  }

  findAllAddressOfCustomer(customerId: string) {
    return this.prisma.customerAddress.findMany({
      where: { customerId: customerId },
      orderBy: [{ primary: 'desc' }, { createdAt: 'desc' }],
    });
  }

  findOne(id: string) {
    return this.prisma.customerAddress.findUnique({
      where: { id },
    });
  }

  removePrimaryAddressStatus(id, customerId) {
    return this.prisma.customerAddress.update({
      where: { id, customerId },
      data: { primary: false },
    });
  }

  async update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    if (updateCustomerAddressDto.primary) {
      await this.prisma.customerAddress.updateMany({
        where: {
          customerId: updateCustomerAddressDto.customerId,
        },
        data: {
          primary: false,
        },
      });
    }
    return this.prisma.customerAddress.update({
      where: { id },
      data: updateCustomerAddressDto,
    });
  }

  /** This function will update one customerAddress's primary to true and all of the other customerAddresses will be updated to false since only one should be true.
   *
   * @param id
   * @param customerId
   */
  async updatePrimaryAddress(id: string, customerId: string) {
    return this.prisma.$transaction([
      this.prisma.customerAddress.updateMany({
        where: {
          customerId,
          id: { not: id },
        },
        data: { primary: false },
      }),
      this.prisma.customerAddress.update({
        where: { id, customerId },
        data: { primary: true },
      }),
    ]);
  }

  async remove(id: string) {
    const activeOrder = await this.prisma.order.findFirst({
      where: {
        customerAddress: { id },
        status: { not: Status.completed },
      },
    });

    if (activeOrder) {
      throw new HttpException(
        "There is an active order in progress, account can't be deleted",
        HttpStatus.CONFLICT,
      );
    }

    const deletedAddress = await this.prisma.customerAddress.delete({
      where: { id },
    });

    if (deletedAddress.primary) {
      const nextPrimaryAddress = await this.prisma.customerAddress.findFirst({
        where: {
          customerId: deletedAddress.customerId,
        },
      });
      if (nextPrimaryAddress) {
        await this.prisma.customerAddress.update({
          where: { id: nextPrimaryAddress.id },
          data: {
            primary: true,
          },
        });
      }
    }
    return deletedAddress;
  }
}
