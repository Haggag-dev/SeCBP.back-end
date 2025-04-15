import { Controller, Get } from '@nestjs/common';
import { OrdersMicroserviceService } from './orders.microservice.service';

@Controller()
export class OrdersMicroserviceController {
  constructor(private readonly ordersMicroserviceService: OrdersMicroserviceService) {}

  @Get()
  getHello(): string {
    return this.ordersMicroserviceService.getHello();
  }
}
