import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { UsersModule } from 'src/users/users.module';
import { Establishment } from 'src/establishments/entities/establishment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Table, Establishment]), UsersModule],
    controllers: [TablesController],
    providers: [TablesService],
    exports: [TypeOrmModule],
})
export class TablesModule {}
