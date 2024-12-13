import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @IsEmail({}, { message: 'Debe proporcionar un correo válido.' })
  email: string;

  @IsNotEmpty({ message: 'La imagen es obligatoria.' })
  image: string;

  establishments: any [];
}
