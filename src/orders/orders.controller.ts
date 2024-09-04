import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('order-product')
  async addOrderProducts(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.ordersService.createOrderProducts(createOrderProductDto);
  }
  
  @Get('/establishments/:establishmentId/tables/:tableId')
  async getOrdersByTable(
    @Param('establishmentId') establishmentId: number,
    @Param('tableId') tableId: number,
  ): Promise<Order[]> {
    return this.ordersService.getOrdersByTable(establishmentId, tableId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // Más métodos para actualizar, eliminar, etc.
}
