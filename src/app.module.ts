import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { ProductsModule } from './products/products.module';
import { TablesModule } from './tables/tables.module';
import { OrderProductModule } from './order-product/order-product.module';
import { AuthModule } from './auth/model/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '44668545',
      database: 'db_test',
      autoLoadEntities: true,
      synchronize: true, // Be careful with this in production!
    }),
    EstablishmentsModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
    TablesModule,
    OrderProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
