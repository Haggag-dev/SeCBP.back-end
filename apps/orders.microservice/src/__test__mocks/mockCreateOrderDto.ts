import { CreateOrderDto } from '../dto/create-order.dto';

// Mocks an object to be inserted to the orders database
const mockCreateOrderDto: CreateOrderDto = {
  user_id: 3,
  product_id: 1,
  product_name: 'T-Shirt',
  product_price: 19.99,
};

export default mockCreateOrderDto;
