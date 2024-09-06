import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Table } from 'src/tables/entities/table.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  role: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Establishment, establishment => establishment.owner)
  establishments: Establishment[];

  @OneToMany(() => Table, table => table.user)
  tables: Table[];

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];
}

