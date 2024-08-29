import { Establishment } from 'src/establishments/entities/establishment.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';

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

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[];

    @ManyToOne(() => Establishment, establishment => establishment.products)
    @JoinColumn({ name: 'establishmentId' })
    establishment: Establishment;

    @ManyToOne(() => ProductCategory, category => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: ProductCategory;
}

