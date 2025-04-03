import { IsInt, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsInt()
  @IsPositive()
  stock: number;
}
