import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>
    ) {}

    create(createTableDto: CreateTableDto): Promise<Table> {
        const table = this.tableRepository.create(createTableDto);
        return this.tableRepository.save(table);
    }

    findOne(id: number): Promise<Table> {
        return this.tableRepository.findOne(null);
    }

    // Métodos para actualizar, eliminar, etc.
}
