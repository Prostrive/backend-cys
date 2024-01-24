import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateStoreEmployeeDto } from './dto/create-store-employee.dto';
import { UpdateStoreEmployeeDto } from './dto/update-store-employee.dto';
import {
  createEmployee,
  deleteEmployee,
} from './store-employee-admin-sdk.service';

@Injectable()
export class StoreEmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStoreEmployeeDto: CreateStoreEmployeeDto) {
    const user = await createEmployee(
      createStoreEmployeeDto.email,
      createStoreEmployeeDto.password,
    );
    const createStoreEmployeeWithUid = {
      name: createStoreEmployeeDto.name,
      email: createStoreEmployeeDto.email,
      storeId: createStoreEmployeeDto.storeId,
      userId: user.uid,
    };
    return await this.prismaService.storeEmployee.create({
      data: createStoreEmployeeWithUid,
    });
  }

  findAll() {
    return this.prismaService.storeEmployee.findMany();
  }

  findOne(id: string) {
    return this.prismaService.storeEmployee.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByUserId(userId: string) {
    return this.prismaService.storeEmployee.findUnique({
      where: {
        userId,
      },
    });
  }

  update(id: string, updateStoreEmployeeDto: UpdateStoreEmployeeDto) {
    return this.prismaService.storeEmployee.update({
      where: {
        id,
      },
      data: updateStoreEmployeeDto,
    });
  }

  async remove(id: string) {
    const { userId } = await this.prismaService.storeEmployee.findUnique({
      where: {
        id,
      },
    });
    await deleteEmployee(userId);
    return await this.prismaService.storeEmployee.delete({
      where: {
        id,
      },
    });
  }
}
