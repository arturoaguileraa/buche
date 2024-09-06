import { IsBoolean, IsOptional, IsArray, IsInt, IsString } from 'class-validator';

export class UpdateSessionDto {
  // startTime es opcional y ahora es de tipo string
  @IsOptional()
  @IsString()
  startTime?: string;

  // endTime es opcional y también es de tipo string
  @IsOptional()
  @IsString()
  endTime?: string;

  // isActive es opcional y debe ser un booleano
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // tableNumber es opcional y debe ser un entero
  @IsOptional()
  @IsInt()
  tableNumber?: number;

  // establishmentId es opcional y debe ser un entero
  @IsOptional()
  @IsInt()
  establishmentId?: number;

  // userIds es opcional y debe ser un array de enteros
  @IsOptional()
  @IsInt()
  userId?: number;
}
