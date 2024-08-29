import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from '../guards/jwt-auth.strategy';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { GoogleStrategy } from '../guards/google-oauth.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardStrategy, JwtGuard, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}