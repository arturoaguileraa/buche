import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

 @Get(':id')
  findOne(@Param('id') id: number) {
      return this.productsService.findOne(id);
  }

  
  @Get('establishment/:id')
  findAllByEstablishment(@Param('id') id: number) {
    return this.productsService.findAllByEstablishment(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(+id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
      const deleteResult = await this.productsService.remove(+id);
      
      if (deleteResult.affected === 0) {
          throw new NotFoundException('Product not found');
      }

      return { message: 'Product deleted successfully' };
  }

}
