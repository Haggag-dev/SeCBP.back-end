import { IsInt, IsPositive } from 'class-validator';

export class UpdateStockDto {
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
}
