import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Product } from './product.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Establishment, establishment => establishment.productCategories)
  @JoinColumn({ name: 'establishmentId' })
  establishment: Establishment;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
