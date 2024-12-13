import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    establishmentId: number; // Parte de la PK compuesta
  }