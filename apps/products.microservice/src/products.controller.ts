import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from './entities/product.entity';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Get(':id/stock')
  async findStockLevel(@Param('id') id: string): Promise<{ stock: number }> {
    const stock = await this.productsService.findStockLevel(+id);

    return { stock };
  }

  // For system admin.
  @Put(':id/stock')
  @HttpCode(204)
  updateStockLevel(@Body() updateStockDto: UpdateStockDto) {
    return this.productsService.updateStockLevel(updateStockDto);
  }

  @EventPattern('reserve_stock')
  async handleStockReservation(
    @Payload()
    updateStockDto: UpdateStockDto,
  ) {
    console.log(
      '[Products Microservice] Message received from orders microservice:',
      updateStockDto,
    );
    this.productsService.clientUpdateStock(updateStockDto);
  }
}
