import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET }); // Inicializa el JwtService
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = await jwtService.verifyAsync(token); // Verifica y decodifica el token

      console.log(payload);
      
      return payload; // Asume que el usuario está en el payload del token
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  },
);