import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { AdminGuard } from '../admin/admin.guard';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Post()
  @UseGuards(AdminGuard)
  createOrUpdate(@Body() createAppSettingDto: CreateAppSettingDto) {
    return this.appSettingsService.createOrUpdate(createAppSettingDto);
  }

  @Get()
  findOne() {
    return this.appSettingsService.findOne();
  }

  @Delete()
  @UseGuards(AdminGuard)
  remove() {
    return this.appSettingsService.remove();
  }
}
