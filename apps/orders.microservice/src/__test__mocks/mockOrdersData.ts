import { Order, OrderStatus } from '../entities/orders.entity';

const mockOrdersData: Order[] = [
  {
    order_id: 1,
    user_id: 1,
    product_id: 1,
    product_name: 'T-Shirt',
    product_price: 19.99,
    status: OrderStatus.PENDING,
    created_at: new Date('2025-04-14T10:15:00'),
  },
  {
    order_id: 2,
    user_id: 1,
    product_id: 5,
    product_name: 'Dress',
    product_price: 49.99,
    status: OrderStatus.PROCESSING,
    created_at: new Date('2025-04-14T11:20:00'),
  },
  {
    order_id: 3,
    user_id: 2,
    product_id: 8,
    product_name: 'Scarf',
    product_price: 12.99,
    status: OrderStatus.PENDING,
    created_at: new Date('2025-04-14T12:05:00'),
  },
  {
    order_id: 4,
    user_id: 2,
    product_id: 10,
    product_name: 'Gloves',
    product_price: 9.99,
    status: OrderStatus.PROCESSING,
    created_at: new Date('2025-04-14T13:30:00'),
  },
  {
    order_id: 5,
    user_id: 3,
    product_id: 3,
    product_name: 'Sweater',
    product_price: 29.99,
    status: OrderStatus.PENDING,
    created_at: new Date('2025-04-14T14:00:00'),
  },
  {
    order_id: 6,
    user_id: 3,
    product_id: 7,
    product_name: 'Hat',
    product_price: 14.99,
    status: OrderStatus.PENDING,
    created_at: new Date('2025-04-14T15:10:00'),
  },
];

export default mockOrdersData;
