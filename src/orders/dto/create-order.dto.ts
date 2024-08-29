// Asegúrate de que el DTO solo contenga los campos necesarios y de que coincidan los tipos
export class CreateOrderDto {
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  // Otros campos necesarios para la creación
}