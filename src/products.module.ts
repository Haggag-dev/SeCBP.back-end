import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TryModule } from './try/try.module';

@Module({
  imports: [TryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
