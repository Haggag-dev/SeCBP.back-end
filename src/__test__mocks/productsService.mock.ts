import { NotFoundException } from '@nestjs/common';
import { UpdateStockDto } from 'src/dto/update-stock.dto';
import { Product } from 'src/entities/product.entity';
import mockProductsRepository from './productsRepository.mock';

const mockProductsService = {
  findAll: jest.fn().mockImplementation(async () => {
    return mockProductsRepository.find();
  }),

  findOne: jest.fn().mockImplementation(async (id: number) => {
    const product = await mockProductsRepository.findOneBy(id);

    if (!product)
      return Promise.reject(new NotFoundException(`Product with id ${id}`));

    return Promise.resolve(product);
  }),

  findStockLevel: jest.fn().mockImplementation(async (id: number) => {
    const product: Product = await mockProductsRepository.findOneBy(id);

    return product.stock;
  }),

  updateStockLevel: jest.fn(
    async (id: number, updateStockDto: UpdateStockDto) => undefined,
  ),
};

export default mockProductsService;
