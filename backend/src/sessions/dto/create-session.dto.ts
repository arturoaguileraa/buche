import { IsBoolean, IsDate, IsOptional, IsArray, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSessionDto {
  // Fecha de inicio (startTime), asegurando que es de tipo Date
  
  @IsString()
  startTime: string;

  // Fecha de fin (endTime), opcional
  @IsOptional()
  @IsString()
  endTime?: string;

  // Indica si la sesión está activa
  @IsBoolean()
  isActive: boolean;

  // Número de la mesa
  @IsInt()
  tableNumber: number;

  // ID del establecimiento
  @IsInt()
  establishmentId: number;

  // Lista de IDs de los usuarios asociados a la sesión
  @IsInt() // Cada elemento del array debe ser un número
  userId: number;
}
