import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}

  @Get()
  findAll(): string {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.appService.findOne(+id);
  }

  @Get(':id/stock')
  findStockLevel(@Param('id') id: string) {
    return this.appService.findStockLevel(+id);
  }

  @Put(':id/stock')
  updateStockLevel(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ) {
    const stock = UpdateProductDto.stock;
    return this.appService.updateStockLevel(+id, +stock);
  }
}
