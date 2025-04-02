/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './CreateProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
