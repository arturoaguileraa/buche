import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategory } from './entities/product-category.entity';
import { Establishment } from 'src/establishments/entities/establishment.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(ProductCategory)
        private productCategoryRepository: Repository<ProductCategory>,
        @InjectRepository(Establishment)
        private establishmentRepository: Repository<Establishment>,  // Asegúrate de que esto esté correcto
      ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, establishmentId, ...productData } = createProductDto;

    const establishment = await this.establishmentRepository.findOne({ where: { id: establishmentId } });
    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    const category = await this.productCategoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      ...productData,
      establishment,
      category,
    });

    return this.productRepository.save(product);
  }  

  // Método para obtener todos los productos de un establecimiento
  async findAllByEstablishment(establishmentId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { establishment: { id: establishmentId } },
      relations: ['establishment', 'category'], // Para incluir relaciones si es necesario
    });
  }

  async findOne(id: number): Promise<Product> {
      return this.productRepository.findOne({ where: { id } });
  }
    
    // Resto del código...
}
