// session.controller.ts
import { Controller, Get, Post, Patch, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(+id);
  }

  // Endpoint para obtener sesiones activas por mesa y establecimiento
  @Get('/active')
  findActiveSessions(
    @Query('tableNumber') tableNumber: number,
    @Query('establishmentId') establishmentId: number,
    @Query('isActive') isActive: boolean,
  ) {
    return this.sessionService.findActiveSessions(tableNumber, establishmentId, isActive);
  }

  // Endpoint para obtener las sesiones de un usuario por userId
  @Get('/user/:userId')
  async findSessionsByUser(@Param('userId') userId: number) {
    return this.sessionService.findSessionsByUser(userId);
  }

  @Get('active/:establishmentId/:tableId')
  async getActiveSession(
    @Param('establishmentId') establishmentId: number,
    @Param('tableId') tableNumber: number,
  ) {
    console.log("Entro", establishmentId, tableNumber);
    
    const session = await this.sessionService.findActiveSession(establishmentId, tableNumber);

    console.log("Sesion:", session);
    
    return session;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }
}
