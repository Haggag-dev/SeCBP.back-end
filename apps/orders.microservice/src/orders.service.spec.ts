import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { EntityManager } from 'typeorm';
import mockEntityManager from './__test__mocks/mockEntityManager';
import mockOrdersRepository from './__test__mocks/mockOrdersRepository';
import mockOrdersData from './__test__mocks/mockOrdersData';
import { NotFoundException } from '@nestjs/common';
import mockCreateOrderDto from './__test__mocks/mockCreateOrderDto';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();

    ordersService = app.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  describe('findAll', () => {
    const user_id = 1;

    it('should return an array of orders', async () => {
      const result = await ordersService.findAll(1);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(Order);

      expect(mockOrdersRepository.findBy).toHaveBeenCalledWith({ user_id });
    });

    it('should return orders with the given user_id', async () => {
      await expect(ordersService.findAll(user_id)).resolves.toEqual([
        mockOrdersData[0],
        mockOrdersData[1],
      ]);

      expect(mockOrdersRepository.findBy).toHaveBeenCalledWith({ user_id });
    });
  });

  describe('findOne', () => {
    describe('given an id of an order that exists', () => {
      const order_id = 1;
      it('should return an order object', async () => {
        expect(ordersService.findOne(order_id)).resolves.toEqual(
          mockOrdersData[0],
        );

        expect(mockOrdersRepository.findOneBy).toHaveBeenCalledWith({
          order_id,
        });
      });
    });

    describe("given an id of an order that doesn't exist", () => {
      const order_id = -1;

      it('should throw a NotFoundException', async () => {
        expect(ordersService.findOne(order_id)).rejects.toThrow(
          NotFoundException,
        );

        expect(mockOrdersRepository.findOneBy).toHaveBeenCalledWith({
          order_id,
        });
      });

      it('should throw a NotFoundException with the correct message', () => {
        expect(ordersService.findOne(order_id)).rejects.toThrow(
          `Order with id ${order_id} does not exist`,
        );

        expect(mockOrdersRepository.findOneBy).toHaveBeenCalledWith({
          order_id,
        });
      });
    });
  });

  describe('create', () => {
    it('should return an Order object, given a correct CreateUserDto', () => {
      expect(ordersService.create(mockCreateOrderDto)).resolves.toBeInstanceOf(
        Order,
      );

      expect(mockOrdersRepository.create).toHaveBeenCalledWith(
        mockCreateOrderDto,
      );
    });
  });
});
