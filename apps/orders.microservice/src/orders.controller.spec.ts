import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import mockOrdersService from './__test__mocks/mockOrdersService';
import { Order } from './entities/orders.entity';
import mockOrdersData from './__test__mocks/mockOrdersData';
import { NotFoundException } from '@nestjs/common';
import mockCreateOrderDto from './__test__mocks/mockCreateOrderDto';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  describe('findAll', () => {
    const user_id = '1';

    it('should return an array of orders', async () => {
      const result = await ordersController.findAll(user_id);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(Order);

      expect(mockOrdersService.findAll).toHaveBeenCalledWith(+user_id);
    });

    it('should return orders with the given user_id', async () => {
      await expect(ordersController.findAll(user_id)).resolves.toEqual([
        mockOrdersData[0],
        mockOrdersData[1],
      ]);

      expect(mockOrdersService.findAll).toHaveBeenCalledWith(+user_id);
    });
  });

  describe('findOne', () => {
    describe('given an id of an order that exists', () => {
      const order_id = '1';

      it('should return an order object', async () => {
        expect(ordersController.findOne(order_id)).resolves.toEqual(
          mockOrdersData[0],
        );

        expect(mockOrdersService.findOne).toHaveBeenCalledWith(+order_id);
      });
    });

    describe("given an id of an order that doesn't exist", () => {
      const order_id = '-1';

      it('should throw a NotFoundException', async () => {
        expect(ordersController.findOne(order_id)).rejects.toThrow(
          NotFoundException,
        );

        expect(mockOrdersService.findOne).toHaveBeenCalledWith(+order_id);
      });

      it('should throw a NotFoundException with the correct message', () => {
        expect(ordersController.findOne(order_id)).rejects.toThrow(
          `Order with id ${order_id} does not exist`,
        );

        expect(mockOrdersService.findOne).toHaveBeenCalledWith(+order_id);
      });
    });
  });

  describe('create', () => {
    describe('given a correct CreateOrderDto', () => {
      it('should return an Order object', () => {
        expect(
          ordersController.create(mockCreateOrderDto),
        ).resolves.toBeInstanceOf(Order);

        expect(mockOrdersService.create).toHaveBeenCalledWith(
          mockCreateOrderDto,
        );
      });
    });
  });
});
