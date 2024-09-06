import { ProductCategory } from 'src/products/entities/product-category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Table } from 'src/tables/entities/table.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Asegúrate de que la ruta de importación es correcta

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ['bar', 'restaurant', 'cafe', 'bistro'], // Agrega más tipos según necesario
    default: 'restaurant'
  })
  type: string;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  operatingHours: string; // Formato ejemplo: '09:00-23:00', ajusta según necesites

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => Table, table => table.establishment)
  tables: Table[];

  @OneToMany(() => Product, product => product.establishment)
  products: Product[];

  @OneToMany(() => ProductCategory, category => category.establishment)
  productCategories: ProductCategory[];

  @ManyToOne(() => User, user => user.establishments, { nullable: false })
  owner: User;

  @OneToMany(() => User, user => user.establishment)
  waiters: User[];
}
