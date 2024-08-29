import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Controller('order-products')
export class OrderProductController {
    constructor(private readonly orderProductService: OrderProductService) {}

    @Post()
    create(@Body() createOrderProductDto: CreateOrderProductDto) {
        return this.orderProductService.create(createOrderProductDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderProductService.findOne(+id);
    }
}
