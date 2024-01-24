import { Module } from '@nestjs/common';
import { AdminService } from '../../api/admin/admin.service';
import { StoreManagerService } from '@/modules/api/store-manager/store-manager.service';
import { AuthController } from './auth.controller';
import { StoreEmployeeService } from '@/modules/api/store-employee/store-employee.service';

@Module({
  controllers: [AuthController],
  providers: [StoreManagerService, AdminService, StoreEmployeeService],
})
export class AuthModule {}
