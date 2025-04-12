

![Sem título (1)](https://github.com/user-attachments/assets/7e91979b-c246-4818-8b6b-7395763d49e5)


# 📦 Documentação da API - Gerenciamento de Produtos

**Atualizado em:** 12/04/2025

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: NestJS  
- **ORM**: TypeORM  
- **Banco de dados**: PostgreSQL (Tembo)  
- **Validações**: class-validator  
- **Documentação de rotas**: Swagger

---

## 🧱 Entidade: Product

```ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

```

---

## 📦 DTOs

### ✅ CreateProductDto

```ts
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
}

```

### ✅ UpdateProductDto

```ts
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './CreateProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

---

## 🔁 Rotas da API

### 📄 `GET /`
- **Descrição**: Retorna todos os produtos cadastrados.
- **Retorno**: `ProductDTO[] | undefined`

---

### 🔍 `GET /:id`
- **Descrição**: Retorna um produto específico por ID.
- **Parâmetros**:
  - `id`: UUID do produto.
- **Erros possíveis**:
  - `404 NOT FOUND`: Produto não encontrado.
- **Retorno**: `Product | undefined`

---

### ➕ `POST /create`
- **Descrição**: Cria um novo produto.
- **Body**:

```json
{
  "name": "Produto X",
  "price": 99.90
}
```

- **Erros possíveis**:
  - `400 BAD REQUEST`: Falha de validação.
- **Retorno**: `ProductDTO | undefined`

---

### 📝 `PATCH /:id`
- **Descrição**: Atualiza um produto existente.
- **Parâmetros**:
  - `id`: UUID do produto.
- **Body**:

```json
{
  "name": "Nome atualizado"
}
```

- **Erros possíveis**:
  - `404 NOT FOUND`: Produto não encontrado.
- **Retorno**: `Product | undefined`

---

### ❌ `DELETE /:id`
- **Descrição**: Remove um produto pelo ID.
- **Parâmetros**:
  - `id`: UUID do produto.
- **Erros possíveis**:
  - `404 NOT FOUND`: Produto não encontrado.
- **Retorno**: `void`

---

## ⚠️ Erros Comuns

| Código | Descrição                   |
|--------|-----------------------------|
| 400    | Dados inválidos (validação) |
| 404    | Produto não encontrado      |

---

## 🔍 Swagger

**Endpoint da documentação Swagger:**

```
GET /api
```

**Setup no `main.ts`:**

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Products Crud')
    .setDescription('The api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

```
