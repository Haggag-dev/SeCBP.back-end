import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/users/:user_id')
  findAll(@Param('user_id') user_id: string): Promise<Order[]> {
    return this.ordersService.findAll(+user_id);
  }

  @Get('/order/:order_id')
  findOne(@Param('order_id') order_id: string): Promise<Order> {
    return this.ordersService.findOne(+order_id);
  }

  @Post('/order')
  @HttpCode(202)
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @EventPattern('stock_reserved')
  async handleStockConfirmation(
    @Payload()
    updateOrderDto: UpdateOrderDto,
  ) {
    console.log(
      '[Orders Microservice] Message Received from products microservice:',
      updateOrderDto,
    );
    this.ordersService.update(updateOrderDto);
  }
}
