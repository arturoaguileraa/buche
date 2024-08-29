import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { EstablishmentsModule } from 'src/establishments/establishments.module';
import { ProductCategory } from './entities/product-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductCategory]), EstablishmentsModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
