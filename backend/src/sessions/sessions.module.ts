import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity'; // La entidad de Session
import { Table } from '../tables/entities/table.entity'; // La entidad de Table
import { User } from '../users/entities/user.entity'; // La entidad de User
import { Order } from '../orders/entities/order.entity'; // La entidad de Order
import { SessionController } from './sessions.controller';
import { SessionService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Table, User, Order])], // Se registran las entidades necesarias
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
