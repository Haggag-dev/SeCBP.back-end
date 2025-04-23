import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrdersModule } from '../src/orders.module';
import mockCreateOrderDto from '../src/__test__mocks/mockCreateOrderDto';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/:user_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/order/:order_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/order/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/order (POST)', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(mockCreateOrderDto)
      .expect('Content-Type', /json/)
      .expect(202);
  });
});
