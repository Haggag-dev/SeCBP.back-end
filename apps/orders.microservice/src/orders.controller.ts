import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersMicroserviceService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersMicroserviceService.getHello();
  }
}
