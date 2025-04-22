import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('CONFIRM_STOCK_RESERVATION')
    private client: ClientProxy,
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

  // For system admin.
  // To increase stock, declare a negative number/value for the stock key.
  async updateStockLevel(updateStockDto: UpdateStockDto) {
    const updateAmount = +updateStockDto.stock;

    const product = await this.findOne(updateStockDto.product_id);
    if (product.stock < updateAmount) {
      throw new ConflictException(
        'There is not enough stock for this product.',
      );
    }

    product.stock -= updateAmount;
    await this.entityManager.save(product);
  }

  // For client services (in this case the orders microservice)
  async clientUpdateStock(updateStockDto: UpdateStockDto) {
    this.sendUpdatedStockStatusMessage(updateStockDto);
  }

  private async sendUpdatedStockStatusMessage(updateStockDto: UpdateStockDto) {
    try {
      await this.updateStockLevel(updateStockDto);
      await firstValueFrom(
        this.client.emit('stock_reserved', {
          ...updateStockDto,
          status: 'confirmed',
          message: 'success',
        }),
      );
    } catch (err) {
      await firstValueFrom(
        this.client.emit('stock_reserved', {
          ...updateStockDto,
          status: 'rejected',
          message: err.message,
        }),
      );
    }
  }
}
