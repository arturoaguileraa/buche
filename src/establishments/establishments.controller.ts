import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/decorators/user-decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('establishments')
export class EstablishmentsController {
    constructor(private readonly establishmentsService: EstablishmentsService) {}

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() createEstablishmentDto: CreateEstablishmentDto, @GetUser() user: User) {
        return this.establishmentsService.create(createEstablishmentDto, user.id);
    }
    
    @Get()
    findAll() {
        return this.establishmentsService.findAll();
    }

    @Get('owner')
    async getEstablishmentsByOwner(@GetUser() user: User) {
      return this.establishmentsService.findByOwner(user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.establishmentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
        return this.establishmentsService.update(id, updateEstablishmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.establishmentsService.remove(id);
    }
}
