import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ProductsModule } from '../src/products.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/products/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/products/:id/stock (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1/stock')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/products/:id/stock (PUT)', () => {
    return request(app.getHttpServer())
      .put('/products/1/stock')
      .send({ amount: 1 })
      .expect(204);
  });
});
