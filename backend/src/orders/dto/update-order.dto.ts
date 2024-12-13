import { IsEnum } from "class-validator";

export class UpdateOrderDto {
    @IsEnum(['pending', 'completed', 'cancelled'], { message: 'Status must be either pending, completed, or cancelled' })
    status: 'pending' | 'completed' | 'cancelled';
    
    total?: number;
    // Campos opcionales para actualización
}
