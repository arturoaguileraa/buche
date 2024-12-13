import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { EstablishmentsModule } from '../establishments/establishments.module';  // Importa el módulo correspondiente
import { ProductCategoriesModule } from './product-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory]),
    ProductCategoriesModule,
    EstablishmentsModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
