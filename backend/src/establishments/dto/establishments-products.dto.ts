import { Product } from "src/products/entities/product.entity";

export class EstablishmentProductsDto {
  id: number;
  name: string;
  description: string;
  products: Product[];
}
