import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerSearchService } from './customer-search.service';
import { CreateCustomerSearchDto } from './dto/create-customer-search.dto';
import { UpdateCustomerSearchDto } from './dto/update-customer-search.dto';

@Controller('customer-searches')
@ApiTags('customer-searches')
export class CustomerSearchController {
  constructor(private readonly customerSearchService: CustomerSearchService) {}

  @Post()
  create(@Body() createCustomerSearchDto: CreateCustomerSearchDto) {
    return this.customerSearchService.create(createCustomerSearchDto);
  }

  @Get()
  findAll() {
    return this.customerSearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerSearchService.findOne(id);
  }

  @Get('/all/:customerId')
  findCustomerSearchesByCustomerId(@Param('customerId') customerId: string) {
    return this.customerSearchService.findCustomerSearchesByCustomerId(
      customerId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerSearchDto: UpdateCustomerSearchDto,
  ) {
    return this.customerSearchService.update(id, updateCustomerSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerSearchService.remove(id);
  }
}
