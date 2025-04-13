import mockProductsData from './productsData.mock';

const mockProductsRepository = {
  find: jest.fn().mockResolvedValue(mockProductsData),

  findOneBy: jest
    .fn()
    .mockImplementation((criteria: { id: number }) =>
      Promise.resolve(
        mockProductsData.find((mockProduct) => mockProduct.id === criteria.id),
      ),
    ),
};

export default mockProductsRepository;
