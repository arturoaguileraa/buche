import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,

        @InjectRepository(Establishment)
        private readonly establishmentRepository: Repository<Establishment>,
    ) {}

    async create(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategory> {
        const { establishmentId, name, description } = createProductCategoryDto;

        const establishment = await this.establishmentRepository.findOne({
            where: { id: establishmentId }
        });
        
        if (!establishment) {
        throw new NotFoundException('Establishment not found');
        }

        const category = this.productCategoryRepository.create({
        name,
        description,
        establishment,
        });

        return this.productCategoryRepository.save(category);
    }

    async findAllByEstablishment(establishmentId: number): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.find({ where: { establishment: { id: establishmentId } } });
    }
}
