import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerAddressService } from './customer-address.service';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

@Controller('customer-address')
@ApiTags('customer-addresses')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }
  @Get('customer/:customerId')
  @UseGuards(FirebaseAuthGuard)
  findAllAddressOfCustomer(@Param('customerId') customerId: string) {
    return this.customerAddressService.findAllAddressOfCustomer(customerId);
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  findOne(@Param('id') id: string) {
    return this.customerAddressService.findOne(id);
  }

  @Put(':id/:customerId')
  @UseGuards(FirebaseAuthGuard)
  updatePrimaryAddress(
    @Param('id') id: string,
    @Param('customerId') customerId: string,
  ) {
    return this.customerAddressService.updatePrimaryAddress(id, customerId);
  }

  @Put('remove-primary-status/:id/:customerId')
  @UseGuards(FirebaseAuthGuard)
  removePrimaryAddressStatus(
    @Param('id') id: string,
    @Param('customerId') customerId: string,
  ) {
    return this.customerAddressService.removePrimaryAddressStatus(
      id,
      customerId,
    );
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return this.customerAddressService.update(id, updateCustomerAddressDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  remove(@Param('id') id: string) {
    return this.customerAddressService.remove(id);
  }
}
