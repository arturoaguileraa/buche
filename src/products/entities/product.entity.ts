import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { ProductCategory } from './product-category.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  availability: boolean;

  @ManyToOne(() => Establishment, establishment => establishment.products)
  @JoinColumn({ name: 'establishmentId' })
  establishment: Establishment;

  @ManyToOne(() => ProductCategory, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];
}
