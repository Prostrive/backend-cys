import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  FirebaseStrategy,
} from '@whitecloak/nestjs-passport-firebase';
import { AdminService } from '@/modules/api/admin/admin.service';
import { StoreManagerService } from '@/modules/api/store-manager/store-manager.service';
import { StoreEmployeeService } from '@/modules/api/store-employee/store-employee.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly storeManagerService: StoreManagerService,
    private readonly storeEmployeeService: StoreEmployeeService,
    private readonly adminService: AdminService,
  ) {}

  @Get('/login/store-manager/:userId')
  @UseGuards(FirebaseAuthGuard)
  loginManager(@Param('userId') userId: string) {
    return this.storeManagerService.findOneByUserId(userId);
  }

  @Get('/login/admin/:userId')
  @UseGuards(FirebaseStrategy)
  loginAdmin(@Param('userId') userId: string) {
    return this.adminService.findOneByUserId(userId);
  }

  @Get('/login/store-employee/:userId')
  @UseGuards(FirebaseStrategy)
  async loginEmployee(@Param('userId') userId: string) {
    const employee = await this.storeEmployeeService.findOneByUserId(userId);
    if (!employee) {
      const manager = await this.storeManagerService.findOneByUserId(userId);
      console.log('Manager login', manager);
      if (manager) return manager;
      // If no manager and employee, it will return an error due to findUniqueAndThrow
    }
    console.log('Employee login', employee);
    return employee;
  }
}
