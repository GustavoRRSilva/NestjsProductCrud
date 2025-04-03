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
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

// eslint-disable-next-line prettier/prettier

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private products: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.products.find();
  }

  async getById(id: string): Promise<any> {
    try {
      const product = await this.products.findOneByOrFail({ id });
      return product;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException('Produto com esse id não encontrado');
      }
      throw err;
    }
  }

  async createProduct(body: CreateProductDto): Promise<object> {
    const newUser: Product = this.products.create({
      name: body.name,
      price: body.price,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const save = await this.products.save(newUser);
    if (save) {
      return {
        statusCode: 200,
        message: 'Produto criado com sucesso',
        data: newUser,
      };
    }

    return new BadRequestException('Dados insuficientes');
  }

  async deleteProduct(id: string): Promise<any> {
    const productToBeDeleted = await this.products.findOneBy({ id });
    console.log(productToBeDeleted);
    if (productToBeDeleted != null) {
      await this.products.delete(productToBeDeleted);
      return {
        statusCode: 200,
        message: 'Deletado com sucesso ',
      };
    }
    throw new BadRequestException();
  }

  async updateProduct(
    id: string,
    updateProduct: UpdateProductDto,
  ): Promise<any> {
    const product = await this.products.findOneBy({
      id,
    });

    if (product != undefined) {
      if (product.name && updateProduct.name) {
        product.name = updateProduct.name;
      }
      if (product.price && updateProduct.price) {
        product.price = updateProduct.price;
      }
      this.products.save(product);
      return {
        statusCode: 200,
        message: 'Valore(s) alterado(s) com sucesso',
      };
    }

    throw new NotFoundException();
  }
}
