import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UpdateOrderTripDto } from './dto/update-order-trip.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';

@Injectable()
export class OrderTripService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  /** Creation of order trip is done when the driver accept the order
   * So the accepted timestamp will be set to current date
   * @param orderId
   * @returns created order trip
   */
  create(orderId: string) {
    return this.prisma.orderTrip.create({
      data: { orderId, acceptedTimestamp: new Date() },
    });
  }

  findAll() {
    return this.prisma.orderTrip.findMany();
  }

  findOne(query) {
    return this.prisma.orderTrip.findUniqueOrThrow(query);
  }

  findOneOrderTrip(id: string) {
    return this.prisma.orderTrip.findUniqueOrThrow({ where: { id } });
  }

  /** This will be called when a property in order trip is being created or updated
   *
   * @param id
   * @param updateOrderTripDto
   * @returns updated order trip
   */
  update(id: string, updateOrderTripDto: UpdateOrderTripDto) {
    return this.prisma.orderTrip.update({
      where: { id },
      data: updateOrderTripDto,
    });
  }

  updatePickupTime(id: string) {
    return this.update(id, { pickupTimestamp: new Date() });
  }

  updateDeliveredTime(id: string) {
    return this.update(id, { deliveredTimestamp: new Date() });
  }

  remove(id: string) {
    return this.prisma.orderTrip.delete({ where: { id } });
  }
}
