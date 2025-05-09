import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';
import mockProductsService from './__test__mocks/productsService.mock';
import mockProductsData from './__test__mocks/productsData.mock';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('GET /', () => {
    it('should return an array of Products', () => {
      expect(productsController.findAll()).resolves.toEqual(mockProductsData);
    });
  });

  describe('GET /:id', () => {
    describe('given a product id that exists', () => {
      it('should return a product object', () => {
        const productId = '1';

        expect(productsController.findOne(productId)).resolves.toEqual(
          mockProductsData[0],
        );
      });
    });

    describe('given a product id that does not exist', () => {
      const productId = '-1';

      it('should throw a NotFoundException', () => {
        expect(productsController.findOne(productId)).rejects.toThrow(
          NotFoundException,
        );
      });

      it('should throw a NotFoundException with the correct message', () => {
        expect(productsController.findOne(productId)).rejects.toThrow(
          `Product with id ${productId}`,
        );
      });
    });
  });

  describe('GET /:id/stock', () => {
    describe('given a product id that exists', () => {
      const productId = '1';

      it('should resolve by returning an object (i.e., { stock: Promise<number> }', async () => {
        expect(productsController.findStockLevel(productId)).resolves.toEqual({
          stock: mockProductsData[0].stock,
        });
      });
    });
  });

  describe('PUT /:id/stock', () => {
    const productId = '1';

    it('should resolve without returning any value', async () => {
      await expect(
        productsController.updateStockLevel({
          order_id: 1,
          user_id: 1,
          product_id: 1,
          stock: 10,
        }),
      ).resolves.toBeUndefined();
    });
  });
});
