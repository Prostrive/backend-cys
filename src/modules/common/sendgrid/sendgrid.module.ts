// src/prisma/prisma.module.ts

import { SendgridService } from '@/modules/common/sendgrid/sendgrid.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
