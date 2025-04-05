import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  findStockLevel(id: number): string {
    return `Return stock level of #${id} product`;
  }

  updateStockLevel(id: number, amount: number): string {
    return `decrease (update) the stock level of #${id} product with the following amount ${amount}`;
  }
}
