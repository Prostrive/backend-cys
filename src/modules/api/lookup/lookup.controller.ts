import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cities } from '@prisma/client';

@Controller('lookup')
@ApiTags('lookup')
export class LookupController {
  @Get('cities')
  cities() {
    return Object.values(Cities);
  }
}
