import mockProductsData from './productsData.mock';

const mockProductsRepository = {
  find: jest
    .fn()
    .mockImplementation(async () => Promise.resolve(mockProductsData)),

  findOneBy: jest
    .fn()
    .mockImplementation(async (id: number) =>
      Promise.resolve(
        mockProductsData.find((mockProduct) => mockProduct.id === id),
      ),
    ),
};

export default mockProductsRepository;
