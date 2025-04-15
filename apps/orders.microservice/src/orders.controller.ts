import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';

@Controller()
export class OrdersController {
  constructor(private readonly ordersMicroserviceService: OrdersService) {}

  @Get('/orders/:user_id')
  findAll(@Param('user_id') user_id: string): Promise<Order[]> {
    return this.ordersMicroserviceService.findAll(+user_id);
  }
}
