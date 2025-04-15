import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { EntityManager } from 'typeorm';
import mockEntityManager from './__test__mocks/mockEntityManager';
import mockOrdersRepository from './__test__mocks/mockOrdersRepository';

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
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    ordersService = app.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });
});
