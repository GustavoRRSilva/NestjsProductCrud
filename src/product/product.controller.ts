/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './entity/Product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}
  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Post()
  createProduct(@Body() body: CreateProductDto): Product {
    return this.productsService.createProduct(body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Product[] {
    return this.productsService.deleteProduct(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): string {
    return this.productsService.updateProduct(id, updateProduct);
  }
}
