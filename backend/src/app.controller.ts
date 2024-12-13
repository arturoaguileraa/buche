import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @Get('ruta-protegida')
  @UseGuards(JwtGuard)
  getProtectedRoute() {
    return { message: 'Esta es una ruta protegida' };
  }

  @Get()
  getPublicRoute() {
    return { message: 'Esta es una ruta pública' };
  }
}
