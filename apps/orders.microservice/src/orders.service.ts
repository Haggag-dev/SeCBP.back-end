import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async findAll(user_id: number): Promise<Order[]> {
    return this.ordersRepository.findBy({ user_id });
  }

  async findOne(order_id: number): Promise<Order> {
    const order: Order | null = await this.ordersRepository.findOneBy({
      order_id,
    });

    if (!order)
      throw new NotFoundException(`Order with id ${order_id} does not exist`);

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create({
      ...createOrderDto,
      status: OrderStatus.PROCESSING,
    });
    return this.ordersRepository.save(order);
  }
}
