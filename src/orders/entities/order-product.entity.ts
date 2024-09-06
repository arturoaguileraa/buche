import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  priceAtTimeOfOrder: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, order => order.orderProducts, {
    onDelete: 'CASCADE',  // Esto asegura que si la orden se borra, también se borra el orderProduct
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
