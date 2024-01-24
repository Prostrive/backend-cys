import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { ExpoService } from '@/modules/common/expo/expo.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(
    private readonly customersService: CustomerService,
    private readonly expoService: ExpoService,
  ) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Get('login/:userId')
  @UseGuards(FirebaseAuthGuard)
  login(
    @Param('userId') userId: string,
    @Query('notificationToken') notificationToken?: string,
  ) {
    return this.customersService.login(userId, notificationToken);
  }

  @Get('/all/token')
  findAllWithToken() {
    return this.customersService.findAllWithToken();
  }

  @Get('cys-credit/:customerId')
  @UseGuards(FirebaseAuthGuard)
  getCYSCredit(@Param('customerId') customerId: string) {
    return this.customersService.getCYSCredit(customerId);
  }

  @Delete(':userId')
  @UseGuards(FirebaseAuthGuard)
  delete(@Param('userId') userId: string) {
    return this.customersService.deleteCustomer(userId);
  }
}
