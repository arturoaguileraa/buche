import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderProduct])],
    controllers: [OrderProductController],
    providers: [OrderProductService],
})
export class OrderProductModule {}
