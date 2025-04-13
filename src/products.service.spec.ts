import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager } from 'typeorm';
import mockProductsRepository from './__test__mocks/productsRepository.mock';
import mockProductsData from './__test__mocks/productsData.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;

  const mockEntityManager = {};
  const correctProductId = 1;
  const falseProductId = -1;

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

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      expect(productsService.findAll()).resolves.toEqual(mockProductsData);
    });
  });

  describe('findOne', () => {
    describe('given an id of a product that exists', () => {
      it('should return a product object', async () => {
        expect(productsService.findOne(correctProductId)).resolves.toEqual(
          mockProductsData[0],
        );
      });
    });

    describe("given an id of a product that doesn't exist", () => {
      it('should throw a NotFoundException', async () => {
        expect(productsService.findOne(falseProductId)).rejects.toThrow(
          NotFoundException,
        );
      });

      it('should throw a NotFoundException with the correct message', () => {
        expect(productsService.findOne(falseProductId)).rejects.toThrow(
          `Product with id ${falseProductId}`,
        );
      });
    });
  });
});
