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
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
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

  async updateStockLevel(id: number, updateStockDto: UpdateStockDto) {
    const updateAmount = +updateStockDto.amount;

    const product = await this.findOne(id);
    if (product.stock < updateAmount) {
      throw new ConflictException(
        'There is not enough stock for this product.',
      );
    }

    product.stock -= updateAmount;
    await this.entityManager.save(product);
  }

  @EventPattern('reserve_stock')
  async handleStockReservation(
    @Payload()
    order: {
      order_id: number;
      user_id: number;
      product_id: number;
      stock: number;
    },
  ) {
    try {
      await this.updateStockLevel(order.product_id, { amount: order.stock });
      await firstValueFrom(
        this.client.emit('stock_reserved', {
          ...order,
          status: 'confirmed',
          message: 'success',
        }),
      );
    } catch (err) {
      await firstValueFrom(
        this.client.emit('stock_reserved', {
          ...order,
          status: 'rejected',
          message: err.message,
        }),
      );
    }
  }
}
