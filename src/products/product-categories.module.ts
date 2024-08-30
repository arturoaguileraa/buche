import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { EstablishmentsModule } from '../establishments/establishments.module'; // Importa el módulo de establecimientos

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory]),
    EstablishmentsModule // Asegúrate de importar el módulo de establecimientos aquí
  ],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
  exports: [TypeOrmModule]
})
export class ProductCategoriesModule {}
