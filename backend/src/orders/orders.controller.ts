import { Controller, Post, Get, Body, Param, Put, Delete, Patch, NotFoundException } from '@nestjs/common';
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

  @Get('establishment/:establishmentId')
  async getOrdersByEstablishment(@Param('establishmentId') establishmentId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByEstablishment(establishmentId);
  }
  
  @Get('/establishments/:establishmentId/tables/:tableId')
  async getOrdersByTable(
    @Param('establishmentId') establishmentId: number,
    @Param('tableId') tableId: number,
  ): Promise<Order[]> {
    return this.ordersService.getOrdersByTable(establishmentId, tableId);
  }

  @Get('sessions/:sessionId')
  async getOrdersBySession(@Param('sessionId') sessionId: number) {
    return this.ordersService.findOrdersBySession(sessionId);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.ordersService.delete(id);
    if (!result) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return { message: 'Order deleted successfully' };
  }

  // Más métodos para actualizar, eliminar, etc.
}

