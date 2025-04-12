import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.appService.findOne(+id);
  }

  @Get(':id/stock')
  findStockLevel(@Param('id') id: string): Promise<number> {
    return this.appService.findStockLevel(+id);
  }

  @Put(':id/stock')
  @HttpCode(204)
  updateStockLevel(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.appService.updateStockLevel(+id, updateStockDto);
  }
}
