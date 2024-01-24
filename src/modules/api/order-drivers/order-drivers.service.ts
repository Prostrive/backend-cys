import { Injectable } from '@nestjs/common';
import { CreateOrderDriverDto } from './dto/create-order-driver.dto';
import { UpdateOrderDriverDto } from './dto/update-order-driver.dto';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { DriverType } from '@prisma/client';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class OrderDriversService {
  constructor(
    private prisma: PrismaService,
    private readonly driverService: DriverService,
  ) {}

  /**This function will create one orderDriver
   *
   * @param createOrderDriverDto
   * @returns created orderDriver{}
   */
  create(createOrderDriverDto: CreateOrderDriverDto) {
    return this.prisma.orderDriver.create({ data: createOrderDriverDto });
  }

  /** This function will create orderDrivers on each  available drivers found
   * Validation: Don't create when it already exists
   * @param type
   * @param orderId
   * @returns orderDrivers
   */
  async createOrderDriversForAllDrivers(type: DriverType, orderId: string) {
    const drivers = await this.driverService.findAvailableDrivers(type);
    return await Promise.all(
      drivers.map(async (driver) => {
        const orderDriver = await this.prisma.orderDriver.findFirst({
          where: { orderId, driverId: driver.id },
        });
        if (!orderDriver) {
          return this.create({ driverId: driver.id, orderId });
        }
      }),
    );
  }
  findAll() {
    return `This action returns all orderDrivers`;
  }

  findOne(id: string) {
    return this.prisma.orderDriver.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateOrderDriverDto: UpdateOrderDriverDto) {
    return `This action updates a #${id} orderDriver`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderDriver`;
  }
}
