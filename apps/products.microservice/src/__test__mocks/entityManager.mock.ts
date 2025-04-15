import { Product } from '../entities/product.entity';

const mockEntityManager = {
  save: jest.fn().mockImplementation((product: Product) => product),
};

export default mockEntityManager;
