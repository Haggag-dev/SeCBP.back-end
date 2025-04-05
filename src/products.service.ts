import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product with id ${id}`);

    return product;
  }

  async findStockLevel(id: number): Promise<number> {
    const product = await this.findOne(id);

    return product.stock;
  }

  updateStockLevel(id: number, amount: number): string {
    return `decrease (update) the stock level of #${id} product with the following amount ${amount}`;
  }
}
