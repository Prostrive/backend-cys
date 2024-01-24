import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { GoogleTranslateModule } from '@/modules/common/google-translate/google-translate.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [GoogleTranslateModule],
})
export class ProductModule {}
