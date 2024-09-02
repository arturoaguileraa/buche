// update-product.dto.ts
import { IsOptional, IsString, IsNumber, IsEmail, IsUrl, IsBoolean } from 'class-validator';


export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    availability?: boolean;
}