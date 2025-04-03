import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/Product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConst } from './typeorm';

@Module({
  imports: [
    TypeOrmModuleConst,
    TypeOrmModule.forFeature([Product]),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
