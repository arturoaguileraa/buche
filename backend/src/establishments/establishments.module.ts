import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { UsersModule } from '../users/users.module';  // Importa aquí el módulo de usuarios

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment]),
    UsersModule  // Asegúrate de importar el módulo de usuarios
  ],
  providers: [EstablishmentsService],
  controllers: [EstablishmentsController],
  exports: [TypeOrmModule]
})
export class EstablishmentsModule {}
