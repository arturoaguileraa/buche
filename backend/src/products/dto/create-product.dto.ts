import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  availability: boolean;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  establishmentId: number;
}
