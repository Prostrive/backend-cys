import { Injectable } from '@nestjs/common';
import { Language, ProductStatus, Status } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateStoreOrderLineDto } from './dto/create-order-item.dto';
import {
  UpdateStatusOrderLineDto,
  UpdateOrderLineDto,
} from './dto/update-order-item.dto';

@Injectable()
export class OrderLineService {
  constructor(private prisma: PrismaService) {}

  async create(
    createStoreOrderLineDto: CreateStoreOrderLineDto,
    language: Language,
  ) {
    const storeOrderLine = await this.prisma.storeOrderLine.create({
      data: createStoreOrderLineDto,
      include: {
        product: {
          select: {
            productTranslations: {
              where: { language },
              take: 1, // Limit the number of productTranslations to 1
            },
            price: true,
          },
        },
      },
    });

    const productName =
      storeOrderLine.product?.productTranslations[0]?.name || null;

    return {
      productName,
      price: storeOrderLine.product.price,
      quantity: storeOrderLine.quantity,
      total: storeOrderLine.totalPrice,
    };
  }

  async findAll() {
    const orderLines = await this.prisma.storeOrderLine.findMany({
      include: {
        product: {
          select: { productTranslations: { select: { name: true } } },
        },
      },
    });

    return orderLines.map(({ product: { productTranslations }, ...items }) => ({
      ...items,
      productName: productTranslations[0].name,
    }));
  }

  findOne(id: string) {
    return this.prisma.storeOrderLine.findUniqueOrThrow({
      where: { id },
    });
  }

  async findAllOrderLineByStoreOrder(id: string) {
    const orderLines = await this.prisma.storeOrderLine.findMany({
      where: { storeOrderId: id },
      include: {
        product: {
          select: { productTranslations: { select: { name: true } } },
        },
      },
      orderBy: { id: 'asc' },
    });
    return orderLines.map(({ product: { productTranslations }, ...items }) => ({
      ...items,
      productName: productTranslations[0].name,
    }));
  }

  // make status of the ids 'rejected'
  async setRejectedStatus(
    rejectedOrderLine: UpdateStatusOrderLineDto,
    storeId: string,
  ) {
    const { orderLineIds, storeOrderId } = rejectedOrderLine;

    const updatedOrderLine = await this.prisma.storeOrderLine.updateMany({
      where: {
        id: { in: orderLineIds },
        storeOrderId,
        storeOrder: { storeId },
      },
      data: {
        status: ProductStatus.rejected,
      },
    });
    return updatedOrderLine;
  }
  // make status of the ids 'accepted'
  async setAcceptedStatus(
    acceptedOrderLine: UpdateStatusOrderLineDto,
    storeId: string,
  ) {
    const { orderLineIds, storeOrderId } = acceptedOrderLine;
    const updatedOrderLine = await this.prisma.storeOrderLine.updateMany({
      where: {
        id: { in: orderLineIds },
        storeOrderId,
        storeOrder: { storeId },
      },
      data: {
        status: ProductStatus.accepted,
      },
    });
    return updatedOrderLine;
  }

  /** Function that will update all orderLines of a storeOrder to accepted
   *
   * @param storeOrderId
   * @returns array of orderLine with Accepted status
   */
  async setAllOrderLineToAccepted(storeOrderId: string) {
    const orderLines = await this.findAllOrderLineByStoreOrder(storeOrderId);
    const allOrderLinesIds = orderLines.map((orderLine) => orderLine.id);
    const updatedOrderLine = await Promise.all(
      allOrderLinesIds.map(async (id) => {
        return await this.prisma.storeOrderLine.update({
          where: { id, storeOrderId },
          data: {
            status: ProductStatus.accepted,
          },
        });
      }),
    );
    return updatedOrderLine;
  }

  /** Function that will update all orderLines of a storeOrder to rejected
   *
   * @param storeOrderId
   * @returns array of orderLine with Rejected status
   */
  async setAllOrderLineToRejected(storeOrderId: string) {
    const orderLines = await this.findAllOrderLineByStoreOrder(storeOrderId);
    const allOrderLinesIds = orderLines.map((orderLine) => orderLine.id);
    const updatedOrderLine = await Promise.all(
      allOrderLinesIds.map(async (id) => {
        return await this.prisma.storeOrderLine.update({
          where: { id, storeOrderId },
          data: {
            status: ProductStatus.rejected,
          },
        });
      }),
    );
    return updatedOrderLine;
  }

  update(id: string, updateOrderItemDto: UpdateOrderLineDto) {
    return this.prisma.storeOrderLine.update({
      where: { id },
      data: { ...updateOrderItemDto },
    });
  }

  remove(id: string) {
    return this.prisma.storeOrderLine.delete({ where: { id } });
  }
}
