import { NotFoundException } from '@nestjs/common';
import { Order } from '../entities/orders.entity';
import mockOrdersRepository from './mockOrdersRepository';
import { CreateOrderDto } from '../dto/create-order.dto';

const mockOrdersService = {
  findAll: jest.fn().mockImplementation(async (user_id: number) => {
    return mockOrdersRepository.findBy({ user_id });
  }),

  findOne: jest.fn().mockImplementation(async (order_id: number) => {
    const order: Order | null = await mockOrdersRepository.findOneBy({
      order_id,
    });

    if (!order)
      throw new NotFoundException(`Order with id ${order_id} does not exist`);

    return order;
  }),

  create: jest
    .fn()
    .mockImplementation(
      async (createOrderDto: CreateOrderDto): Promise<Order> => {
        const order = mockOrdersRepository.create(createOrderDto);
        return mockOrdersRepository.save(order);
      },
    ),
};

export default mockOrdersService;
