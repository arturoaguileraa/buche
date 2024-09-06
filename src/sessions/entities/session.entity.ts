import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: string;

  @Column({ nullable: true })
  endTime: string;

  @Column({ default: true })
  isActive: boolean;

  // Relación con la tabla
  @ManyToOne(() => Table, table => table.sessions, { eager: true })
  table: Table;

  // Relación con el usuario (Una sesión solo pertenece a un usuario)
  @ManyToOne(() => User, user => user.sessions, { eager: true })
  user: User;

  // Relación con los pedidos realizados durante la sesión
  @OneToMany(() => Order, order => order.session)
  orders: Order[];
}
