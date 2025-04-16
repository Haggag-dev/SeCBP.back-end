import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsInt()
  @IsPositive()
  product_id: number;

  @IsString()
  product_name: string;

  @IsNumber()
  @IsPositive()
  product_price: number;
}
