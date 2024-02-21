import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { Language } from '@prisma/client';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('/bulk')
  createBulk(@Body() createProductDtos: CreateProductDto[]) {
    return this.productService.createBulkProducts(createProductDtos);
  }

  @Get()
  findAll(@Query('language') language: string) {
    return this.productService.findAll(Language.en);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('language') language: string) {
    return this.productService.findOne(id, Language.en);
  }

  @Get('/store/:storeId')
  findAllByStoreId(
    @Param('storeId') storeId: string,
    @Query('language') language: string,
  ) {
    return this.productService.findProductsByStore(storeId, Language.en);
  }

  @Get('store/:storeId/:searchTerm')
  findByStoreId(
    @Param('storeId') storeId: string,
    @Param('searchTerm') searchTerm: string,
    @Query('language') language: string,
  ) {
    return this.productService.findByProductNameAndStoreId(
      storeId,
      searchTerm,
      Language.en,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  deleteProducts(@Body() { ids }: { ids: string[] }) {
    return this.productService.deleteProducts(ids);
  }
}
