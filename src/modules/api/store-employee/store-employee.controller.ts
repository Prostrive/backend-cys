import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreEmployeeService } from './store-employee.service';
import { CreateStoreEmployeeDto } from './dto/create-store-employee.dto';
import { UpdateStoreEmployeeDto } from './dto/update-store-employee.dto';

@Controller('store-employee')
export class StoreEmployeeController {
  constructor(private readonly storeEmployeeService: StoreEmployeeService) {}

  @Post()
  create(@Body() createStoreEmployeeDto: CreateStoreEmployeeDto) {
    return this.storeEmployeeService.create(createStoreEmployeeDto);
  }

  @Get()
  findAll() {
    return this.storeEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeEmployeeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreEmployeeDto: UpdateStoreEmployeeDto,
  ) {
    return this.storeEmployeeService.update(id, updateStoreEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeEmployeeService.remove(id);
  }
}
