import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entity/Product.entity';

export const TypeOrmModuleConst = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.PASSWORD,
  entities: [Product],
  synchronize: true,
  extra: {
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 12,
  },
  ssl: { rejectUnauthorized: false },
});
