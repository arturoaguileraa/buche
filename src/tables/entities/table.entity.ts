import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Table {
  @PrimaryColumn() // Usa PrimaryColumn en lugar de PrimaryGeneratedColumn
  number: number;

  @PrimaryColumn() // También establece el establishmentId como parte de la PK compuesta
  establishmentId: number;

  @Column({ nullable: true })
  capacity: number;

  @Column({
    type: 'enum',
    enum: ['available', 'occupied', 'reserved'],
    default: 'available'
  })
  status: 'available' | 'occupied' | 'reserved';

  // Ejemplo de relación OneToMany con la entidad Order (si es aplicable)
  @OneToMany(() => Order, order => order.table)
  orders: Order[];

  @ManyToOne(() => User, user => user.tables, { nullable: true }) // Relación con usuario
  @JoinColumn({ name: 'userId' })
  user: User;  // Relación con User

  @ManyToOne(() => Establishment, establishment => establishment.tables)
  @JoinColumn({ name: 'establishmentId' })
  establishment: Establishment;
}
