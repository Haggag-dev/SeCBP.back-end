import { IsInt, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @IsInt()
  @IsPositive()
  amount: number;
}
