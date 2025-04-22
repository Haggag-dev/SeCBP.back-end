import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('RESERVE_STOCK')
    private client: ClientProxy,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async findAll(user_id: number): Promise<Order[]> {
    return this.ordersRepository.findBy({ user_id });
  }

  async findOne(order_id: number): Promise<Order> {
    const order: Order | null = await this.ordersRepository.findOneBy({
      order_id,
    });

    if (!order)
      throw new NotFoundException(`Order with id ${order_id} does not exist`);

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create({
      ...createOrderDto,
      status: OrderStatus.PROCESSING,
    });
    const savedOrder = await this.ordersRepository.save(order);

    this.sendStockReservationMessage(savedOrder);

    return savedOrder;
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const order: Order = await this.findOne(updateOrderDto.order_id);

    if (updateOrderDto.status === OrderStatus.CONFIRMED) {
      order.status = OrderStatus.CONFIRMED;
    } else {
      order.status = OrderStatus.REJECTED;
    }

    const savedOrder = await this.ordersRepository.save(order);

    console.log(
      `Order saved with status ${order.status}. The saved order: ${savedOrder}`,
    );
  }

  private async sendStockReservationMessage(order: Order) {
    const message = {
      order_id: order.order_id,
      user_id: order.user_id,
      product_id: order.product_id,
      stock: 1,
    };

    await firstValueFrom(this.client.emit('reserve_stock', message));
  }
}
