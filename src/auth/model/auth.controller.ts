import { Controller, Post, Body, Res, Headers, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  @Post('google-login')
  async googleAuth(@Body('accessToken') accessToken: string, @Res() res: Response) {
    try {
      const jwt_token = await this.authService.verifyGoogleAccessToken(accessToken);
      return res.json(jwt_token);
      
    } catch (error) {
      console.error('Error al verificar el token de Google:', error);
      res.status(401).send('Unauthorized');
    }
  }

  @Post('set-role')
  async assignRole(@Body() body: { role: string }, @Headers('Authorization') authorization: string) {
      const token = authorization.replace('Bearer ', '');
      
      if (!body.role || !token) {
          throw new BadRequestException('Role and token are required');
      }
      
      try {
          const payload = await this.jwtService.verifyAsync(token);
          
          const user = await this.userService.findOneByEmail(payload.email);
          
          if (!user) {
              throw new NotFoundException('User not found');
          }

          user.role = body.role;
          await this.userService.update(user.id, user);

          return { success: true };
      } catch (error) {
          throw new UnauthorizedException('Invalid token');
      }
  }

  @Post('refresh-token')
  async refreshToken(@Headers('Authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    return this.authService.refreshToken(token);
  }
}
