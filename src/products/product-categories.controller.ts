// src/product-categories/product-categories.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Controller('product-categories')
export class ProductCategoriesController {
    constructor(private readonly productCategoriesService: ProductCategoriesService) {}

    @Post()
    async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productCategoriesService.create(createProductCategoryDto);
    }

    @Get(':establishmentId')
    async findAllByEstablishment(@Param('establishmentId') establishmentId: number) {
        return this.productCategoriesService.findAllByEstablishment(establishmentId);
    }
}
