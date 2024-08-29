import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Post()
    create(@Body() createTableDto: CreateTableDto) {
        return this.tablesService.create(createTableDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.tablesService.findOne(id);
    }

    // Más métodos para actualizar, eliminar, etc.
}
