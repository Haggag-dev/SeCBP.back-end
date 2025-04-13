import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager } from 'typeorm';
import mockProductsRepository from './mocks/productsLogic.mock';
import mockProductsData from './mocks/productsData.mock';

describe('ProductsService', () => {
  let productsService: ProductsService;

  const mockEntityManager = {};

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    productsService = app.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      expect(mockProductsRepository.findAll()).resolves.toEqual(
        mockProductsData,
      );
    });
  });
});
