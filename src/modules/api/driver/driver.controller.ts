import { RegisterDriverDto } from '@/modules/api/driver/dto/register.driver.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverType, Language } from '@prisma/client';
import { DriverService } from './driver.service';
import {
  CreateDriverDto,
  DriverResponseDto,
  UpdateAvailabilityDto,
} from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { OrderService } from '../order/order.service';
import { DriverGuard } from './driver.guard';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly orderService: OrderService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  register(
    @UploadedFile() image: Express.Multer.File,
    @Body() registerDriverDto: RegisterDriverDto,
  ) {
    return this.driverService.register(image, registerDriverDto);
  }

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }

  @Get('availability/:id')
  @UseGuards(DriverGuard)
  getAvailability(@Param('id') id: string) {
    return this.driverService.getAvailability(id);
  }
  @Patch('availability/:id')
  @UseGuards(DriverGuard)
  updateAvailability(
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    @Param('id') id: string,
  ) {
    return this.driverService.updateAvailability(
      id,
      updateAvailabilityDto.available,
    );
  }
  @Get('tickets/:type')
  getAllAvailableDriverTickets(@Param('type') type: DriverType) {
    return this.driverService.sendDriversNotification(
      type,
      'Notification for all drivers',
    );
  }

  @Get('available/orders/:driverId')
  @UseGuards(DriverGuard)
  getAvailableOrdersForDrivers(
    @Param('driverId') driverId: string,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    return this.driverService.getAvailableOrdersForDrivers(driverId, lat, lng);
  }

  @Get('order/:driverId')
  @UseGuards(DriverGuard)
  getAcceptedOrderDetailsForDriver(
    @Param('driverId') driverId: string,
    @Query('language') language: Language,
  ) {
    return this.orderService.findAcceptedOrderDetailsForDriver(
      driverId,
      language,
    );
  }

  @Post('order/accept')
  @UseGuards(DriverGuard)
  acceptOrderByDriver(@Body() driverResponseDto: DriverResponseDto) {
    return this.driverService.acceptOrderByDriver(driverResponseDto);
  }

  @Post('order/reject')
  @UseGuards(DriverGuard)
  rejectOrderByDriver(@Body() driverResponseDto: DriverResponseDto) {
    return this.driverService.rejectOrderByDriver(driverResponseDto);
  }
}
