/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import { Delete, Injectable, Patch, Post } from '@nestjs/common';
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
  createProduct(body: CreateProductDto): Product {
    const newUser: Product = {
      id: uuidv4(),
      name: body.name,
      price: body.price,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.products.push(newUser);

    return newUser;
  }

  @Delete()
  deleteProduct(id: string): Product[] {
    return this.products.filter((product) => product.id == id);
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
      return 'Produto deletado';
    }

    return 'Produto não deletado';
  }
}
