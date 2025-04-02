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
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}
  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Post()
  createProduct(@Body() body: CreateProductDto): Product | object {
    return this.productsService.createProduct(body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): object {
    return this.productsService.deleteProduct(id);
  }

  @ApiNotFoundResponse()
  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): string | object {
    return this.productsService.updateProduct(id, updateProduct);
  }
}
