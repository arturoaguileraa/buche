import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { TablesModule } from 'src/tables/tables.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderProduct, Product]),
  TablesModule, UsersModule
],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
