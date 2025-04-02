/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Delete,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './entity/Product.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

// eslint-disable-next-line prettier/prettier

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: uuidv4(),
      created_at: new Date(),
      name: 'Sabão',
      price: 22.5,
      updated_at: new Date(),
    },
  ];

  getAll(): Product[] {
    return this.products;
  }
  @Post()
  createProduct(body: CreateProductDto): object {
    const newUser: Product = {
      id: uuidv4(),
      name: body.name,
      price: body.price,
      created_at: new Date(),
      updated_at: new Date(),
    };

    if (this.products.push(newUser)) {
      return {
        statusCode: 200,
        message: 'Usuario criado com sucesso',
        data: newUser,
      };
    }

    return new BadRequestException('Dados insuficientes');
  }

  @Delete()
  deleteProduct(id: string): object {
    const productToBeDeleted = this.products.find(
      (product) => product.id == id,
    );
    console.log(productToBeDeleted);
    if (productToBeDeleted) {
      this.products = this.products.filter(
        (product) => product.id !== productToBeDeleted.id,
      );
      return {
        statusCode: 200,
        message: 'deletado',
      };
    }
    throw new NotFoundException();
  }

  @Patch()
  updateProduct(id: string, updateProduct: UpdateProductDto) {
    let product: Product | undefined = this.products.find(
      (product) => product.id === id,
    );
    console.log(updateProduct);

    if (product) {
      updateProduct.name ? (product.name = updateProduct.name) : product.name;
      updateProduct.price
        ? (product.price = updateProduct.price)
        : product.price;

      product.updated_at = new Date();
      return {
        statusCode: 200,
        message: 'Produto alterado',
        data: product,
      };
    }

    throw new NotFoundException();
  }
}
