import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private oauthClient: OAuth2Client;
  
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService

  ) {
    this.oauthClient = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID'));
  }

  async verifyGoogleAccessToken(accessToken: string) {
    try {
      // Hacer una solicitud a la API de Google para obtener el perfil del usuario
      const userProfile = await this.getGoogleUserProfile(accessToken);
      
      // Verificar si el usuario está registrado
      let user = await this.usersService.findOneByEmail(userProfile.email);
        
      // Si el usuario no está registrado, crear uno nuevo
      if (!user) {
        const createUserDto = {
          email: userProfile.email,
          name: userProfile.name,
          image: userProfile.picture,
          role: 'PENDING',
          establishments: [],
        };
        user = await this.usersService.create(createUserDto);
        console.log("Nuevo usuario creado.");
        
      }else{
        console.log("Usuario existente.");
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        roles: user.role,
        establishment: user.establishment,
        establishments: user.establishments,
      };
      
      const access_token = await this.jwtService.signAsync(payload)
      
      return {
        access_token: access_token,
      };

    } catch (error) {
      console.error('Error al verificar el token de acceso de Google:', error);
      throw new Error('invalid_token');
    }
  }

  private async getGoogleUserProfile(accessToken: string) {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {headers : {Authorization: `Bearer ${accessToken}`}});
    
    return response.data;
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = {
        email: user.email,
        name: user.name,
        image: user.image,
        roles: user.role,
      };
      
      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
