import { Product } from 'src/entities/product.entity';

const mockEntityManager = {
  save: jest.fn().mockImplementation((product: Product) => product),
};

export default mockEntityManager;
