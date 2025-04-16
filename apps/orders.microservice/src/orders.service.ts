import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
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
}
