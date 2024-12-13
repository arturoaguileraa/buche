import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  establishmentId: number; // Establecimiento asociado

  @IsNumber()
  total: number;

  @IsString()
  date: string;
  
  @IsNumber()
  tableId: number; // ID de la mesa

  @IsNumber()
  sessionId: number;
}
