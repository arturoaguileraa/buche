export class CreateTableDto {
    number: number;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved';
    // Otros campos necesarios para la creación
}