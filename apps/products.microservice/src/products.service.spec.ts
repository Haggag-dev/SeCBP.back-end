import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager } from 'typeorm';
import mockProductsRepository from './__test__mocks/productsRepository.mock';
import mockProductsData from './__test__mocks/productsData.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import mockEntityManager from './__test__mocks/entityManager.mock';
import { UpdateStockDto } from './dto/update-stock.dto';

describe('ProductsService', () => {
  let productsService: ProductsService;

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
        {
          provide: 'CONFIRM_STOCK_RESERVATION',
          useValue: {
            emit: jest.fn(),
          },
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

  describe('findStockLevel', () => {
    it('should return the correct stock level of the given product id', () => {
      expect(productsService.findStockLevel(correctProductId)).resolves.toEqual(
        mockProductsData[correctProductId].stock,
      );
    });
  });

  describe('updateStockLevel', () => {
    const sufficientUpdateAmount: UpdateStockDto = { amount: 10 };
    const insufficientUpdateAmount: UpdateStockDto = { amount: 500 };

    describe('given that there is sufficient stock amount', () => {
      it('should return undefined', () => {
        expect(
          productsService.updateStockLevel(
            correctProductId,
            sufficientUpdateAmount,
          ),
        ).resolves.toBe(undefined);
      });
    });

    describe('given that there is insufficient stock amount', () => {
      it('should throw a ConflictException', () => {
        expect(
          productsService.updateStockLevel(
            correctProductId,
            insufficientUpdateAmount,
          ),
        ).rejects.toThrow(ConflictException);
      });

      it('should throw a ConflictException with the correct message', () => {
        expect(
          productsService.updateStockLevel(
            correctProductId,
            insufficientUpdateAmount,
          ),
        ).rejects.toThrow('There is not enough stock for this product.');
      });
    });
  });
});
