import { Order } from '../entities/orders.entity';
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
};

export default mockOrdersRepository;
