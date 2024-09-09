import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { ProductsModule } from './products/products.module';
import { TablesModule } from './tables/tables.module';
import { AuthModule } from './auth/model/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductCategoriesModule } from './products/product-categories.module';
import { SessionModule } from './sessions/sessions.module';
import { OrdersGateway } from './orders/orders.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ProductCategoriesModule,
    EstablishmentsModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
    TablesModule,
    AuthModule,
    SessionModule
  ],
  controllers: [],
  providers: [OrdersGateway],
})
export class AppModule {}
