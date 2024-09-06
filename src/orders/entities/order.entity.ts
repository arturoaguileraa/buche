import { Table } from "src/tables/entities/table.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./order-product.entity";
import { Session } from "src/sessions/entities/session.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'completed' | 'cancelled';

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  total: number;

  @Column()
  date: string;

  @ManyToOne(() => Table, table => table.orders)
  @JoinColumn([
    { name: 'number', referencedColumnName: 'number' },
    { name: 'establishmentId', referencedColumnName: 'establishmentId' }
  ])
  table: Table;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderProducts: OrderProduct[];

  @ManyToOne(() => Session, session => session.orders)
  session: Session;
}
