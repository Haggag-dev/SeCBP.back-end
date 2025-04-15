import { Injectable } from '@nestjs/common';
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

  getHello(): string {
    return 'Hello World!';
  }
}
