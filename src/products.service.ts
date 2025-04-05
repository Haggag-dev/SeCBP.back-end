import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
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

  async updateStockLevel(id: number, updateStockDto: UpdateStockDto) {
    const updateAmount = +updateStockDto.amount;
    console.log(typeof updateAmount);
    const product = await this.findOne(id);
    if (product.stock < updateAmount) {
      throw new ConflictException(
        'There is not enough stock for this product.',
      );
    }

    product.stock -= updateAmount;
    await this.entityManager.save(product);
  }
}
