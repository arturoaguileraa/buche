// update-product.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';


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