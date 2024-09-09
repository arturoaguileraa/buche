import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    skipMissingProperties: false,
    stopAtFirstError: false,
  }));

  // Configurar CORS con app.enableCors
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Asegúrate de que FRONTEND_URL esté definida correctamente en .env
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Agrega esto si estás usando cookies o autenticación
  });

  await app.listen(3001);
}
bootstrap();
