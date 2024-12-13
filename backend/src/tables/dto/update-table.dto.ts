import { IsOptional, IsString } from "class-validator";

// update-table.dto.ts
export class UpdateTableDto {
    @IsOptional()
    capacity?: number;

    @IsOptional()
    @IsString()
    status?: 'available' | 'occupied' | 'reserved';

    @IsOptional()
    userId?: number;
}