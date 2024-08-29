import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderProducts)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    priceAtTimeOfOrder: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
}
