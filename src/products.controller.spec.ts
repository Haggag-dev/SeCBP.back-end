import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let productsController: ProductsController;

  const mockProductsData = [
    {
      id: 1,
      name: 'T-Shirt',
      price: '19.99',
      imageUrl:
        'https://images.unsplash.com/photo-1649182785115-eb5bd1c4cd45?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      stock: 300,
    },
    {
      id: 2,
      name: 'Jeans',
      price: '39.99',
      imageUrl:
        'https://images.unsplash.com/photo-1649182785115-eb5bd1c4cd45?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      stock: 300,
    },
    {
      id: 3,
      name: 'Sweater',
      price: '29.99',
      imageUrl:
        'https://images.unsplash.com/photo-1649182785115-eb5bd1c4cd45?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      stock: 300,
    },
  ];

  const mockProductsService = {
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
      const product: Product = await mockProductsService.findOne(id);

      return product.stock;
    }),

    updateStockLevel: jest.fn(
      async (id: string, updateStockDto: UpdateStockDto) => undefined,
    ),
  };

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

      it('should resolve by returning a number', async () => {
        await expect(
          productsController.findStockLevel(productId),
        ).resolves.toEqual(mockProductsData[0].stock);
      });
    });
  });

  describe('PUT /:id/stock', () => {
    const productId = '1';

    it('should resolve without returning any value', async () => {
      await expect(
        productsController.updateStockLevel(productId, { amount: 1 }),
      ).resolves.toBeUndefined();
    });
  });
});
