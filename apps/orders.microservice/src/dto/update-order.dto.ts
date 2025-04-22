import { IsIn, IsInt, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from '../entities/orders.entity';

export class UpdateOrderDto {
  @IsInt()
  @IsPositive()
  order_id: number;

  @IsInt()
  @IsPositive()
  user_id: number;

  @IsInt()
  @IsPositive()
  product_id: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsIn([OrderStatus.CONFIRMED, OrderStatus.REJECTED])
  status: OrderStatus.CONFIRMED | OrderStatus.REJECTED;

  @IsString()
  message: string;
}
