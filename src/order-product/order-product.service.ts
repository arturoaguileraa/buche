import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectRepository(OrderProduct)
        private orderProductRepository: Repository<OrderProduct>,
    ) {}

    async create(createOrderProductDto: CreateOrderProductDto): Promise<OrderProduct> {
        const orderProduct = this.orderProductRepository.create(createOrderProductDto);
        return this.orderProductRepository.save(orderProduct);
    }

    async findOne(id: number): Promise<OrderProduct | undefined> {
        return this.orderProductRepository.findOne({ where: { id } });
    }
}
