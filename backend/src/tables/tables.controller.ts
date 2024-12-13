import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Patch } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Post()
    create(@Body() createTableDto: CreateTableDto) {
        return this.tablesService.create(createTableDto);
    }

    @Get(':establishmentId')
    findAllByEstablishment(@Param('establishmentId') establishmentId: number) {
        return this.tablesService.findAllByEstablishment(establishmentId);
    }

    @Get(':establishmentId/:number')
    async getTableStatus(@Param('establishmentId') establishmentId: number,
    @Param('number') number: number,): Promise<Table> {
        const table = await this.tablesService.findOne(establishmentId, number);
        if (!table) {
            throw new NotFoundException('Table not found');
        }
        return table;
    }

    @Patch(':establishmentId/:number')
    async update(
        @Param('establishmentId') establishmentId: number,
        @Param('number') number: number,
        @Body() updateTableDto: UpdateTableDto
    ) {
        return await this.tablesService.update(establishmentId, number, updateTableDto);
    }

    @Delete(':establishmentId/:number')
    async remove(
    @Param('establishmentId') establishmentId: number, 
    @Param('number') number: number
    ): Promise<void> {
    await this.tablesService.remove(establishmentId, number);
    }

}
