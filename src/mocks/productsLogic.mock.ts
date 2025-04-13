import { NotFoundException } from '@nestjs/common';
import mockProductsData from './productsData.mock';
import { UpdateStockDto } from 'src/dto/update-stock.dto';
import { Product } from 'src/entities/product.entity';

const mockProductsLogic = {
  findAll: jest.fn().mockResolvedValue(mockProductsData),

  findOne: jest.fn().mockImplementation((id: string) => {
    const product = mockProductsData.find(
      (mockProduct) => mockProduct.id === Number(id),
    );

    if (!product)
      return Promise.reject(new NotFoundException(`Product with id ${id}`));

    return Promise.resolve(product);
  }),

  findStockLevel: jest.fn().mockImplementation(async (id: string) => {
    const product: Product = await mockProductsLogic.findOne(id);

    return product.stock;
  }),

  updateStockLevel: jest.fn(
    async (id: string, updateStockDto: UpdateStockDto) => undefined,
  ),
};

export default mockProductsLogic;
