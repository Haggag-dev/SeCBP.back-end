import { Test, TestingModule } from '@nestjs/testing';
import { OrdersMicroserviceController } from './orders.microservice.controller';
import { OrdersMicroserviceService } from './orders.microservice.service';

describe('OrdersMicroserviceController', () => {
  let ordersMicroserviceController: OrdersMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersMicroserviceController],
      providers: [OrdersMicroserviceService],
    }).compile();

    ordersMicroserviceController = app.get<OrdersMicroserviceController>(OrdersMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ordersMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
