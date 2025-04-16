import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderStatus } from '../entities/orders.entity';
import mockOrdersData from './mockOrdersData';

const mockOrdersRepository = {
  findBy: jest
    .fn()
    .mockImplementation(
      async (criteria: { user_id: number }): Promise<Order[]> => {
        return mockOrdersData
          .filter((order) => order.user_id === criteria.user_id)
          .map((order) => Object.assign(new Order(), order));
      },
    ),

  findOneBy: jest
    .fn()
    .mockImplementation(async (criteria: { order_id: number }) => {
      return mockOrdersData.find(
        (order) => order.order_id === criteria.order_id,
      );
    }),

  create: jest
    .fn()
    .mockImplementation((createUserDto: CreateOrderDto): Order => {
      const order_id = mockOrdersData[mockOrdersData.length - 1].order_id++;
      const order = new Order();

      Object.assign(order, createUserDto, {
        order_id,
        status: OrderStatus.PROCESSING,
        created_at: new Date(),
      });

      return order;
    }),

  save: jest.fn().mockImplementation((order: Order): Order => order),
};

export default mockOrdersRepository;
