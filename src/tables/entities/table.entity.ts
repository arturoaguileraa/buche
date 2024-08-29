import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
// Importar la entidad Order si es necesario para la relación
// import { Order } from './order.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
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

  @ManyToOne(() => Establishment, establishment => establishment.tables)
  @JoinColumn({ name: 'establishmentId' })
  establishment: Establishment;
}
