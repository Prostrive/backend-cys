import { Module } from '@nestjs/common';
import { StoreEmployeeService } from './store-employee.service';
import { StoreEmployeeController } from './store-employee.controller';

@Module({
  controllers: [StoreEmployeeController],
  providers: [StoreEmployeeService],
})
export class StoreEmployeeModule {}
