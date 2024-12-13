import { IsOptional, IsString, IsNumber, IsEmail, IsUrl } from 'class-validator';

export class UpdateEstablishmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  capacity?: number;

  @IsOptional()
  @IsString()
  operatingHours?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
