import { NestFactory } from '@nestjs/core';
import { OrdersMicroserviceModule } from './orders.microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersMicroserviceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
