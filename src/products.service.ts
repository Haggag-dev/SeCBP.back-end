import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll(): string {
    return 'Return all products';
  }

  findOne(id: number): string {
    return `Return product with id ${id}`;
  }

  findStockLevel(id: number): string {
    return `Return stock level of #${id} product`;
  }

  updateStockLevel(id: number, amount: number): string {
    return `decrease (update) the stock level of #${id} product with the following amount ${amount}`;
  }
}
