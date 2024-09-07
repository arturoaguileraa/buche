import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Table } from '../tables/entities/table.entity';
import { User } from '../users/entities/user.entity';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Session) // Repositorio para la sesión
    private readonly sessionRepository: Repository<Session>,
  ) {}

  // Función para crear una orden
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, establishmentId, tableId, total, date, sessionId } = createOrderDto;

    // Buscar la mesa por number y establishmentId
    const table = await this.tableRepository.findOne({
      where: { number: tableId, establishment: { id: establishmentId } },
    });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    // Buscar el usuario por userId
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Buscar la sesión asociada
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`No se encontró la sesión con ID ${sessionId}`);
    }
    // Crear la orden
    const order = this.orderRepository.create({
      user,
      table,
      total,
      status: 'pending',
      date,
      session
    });
    
    return this.orderRepository.save(order);
  }

  async createOrderProducts(createOrderProductDto: CreateOrderProductDto) {
    const { orderId, productId, quantity, priceAtTimeOfOrder } = createOrderProductDto;

    // Buscar el pedido y el producto asociados
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!order || !product) {
      throw new Error('Order or Product not found');
    }

    // Crear el objeto de OrderProduct
    const orderProduct = this.orderProductRepository.create({
      order,
      product,
      quantity,
      priceAtTimeOfOrder : Number(priceAtTimeOfOrder),
    });

    return this.orderProductRepository.save(orderProduct);
  }

  // Obtener todas las órdenes
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['table', 'user', 'orderProducts'], // Cargar las relaciones necesarias
    });
  }


async getOrdersByTable(establishmentId: number, tableId: number): Promise<Order[]> {
  return this.orderRepository.find({
    where: {
      table: {
        establishmentId,
        number: tableId,
      },
    },
    relations: ['orderProducts', 'orderProducts.product'], // Para obtener los productos del pedido
  });
}

  // Obtener una orden por ID
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['table', 'user', 'orderProducts'], // Cargar las relaciones necesarias
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  // Actualizar una orden
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = null;

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.orderRepository.save(order);
  }

  // Actualizar el estado de la orden
  async updateStatus(id: number, status: 'pending' | 'completed' | 'cancelled'): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = status;

    return this.orderRepository.save(order);
  }

  // Eliminar una orden
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async findOrdersBySession(sessionId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { session: { id: sessionId } }, // Asumiendo que tienes una relación entre pedidos y sesiones
      relations: ['orderProducts'], // Cargar los productos del pedido
    });
  }

  async getOrdersByEstablishment(establishmentId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { table: { establishmentId }, 
     },
      relations: ['table', 'table.establishment', 'orderProducts', 'orderProducts.product'], // Incluye la relación con la tabla para obtener la información del establecimiento
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }

}
