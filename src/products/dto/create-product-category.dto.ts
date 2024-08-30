import { IsString, IsInt } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  establishmentId: number;
}
