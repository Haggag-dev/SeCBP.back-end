import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('PG_HOST'),
        port: +configService.getOrThrow<string>('PG_PORT'),
        username: configService.getOrThrow<string>('PG_USERNAME'),
        password: configService.getOrThrow<string>('PG_PASSWORD'),
        database: configService.getOrThrow<string>('PG_NAME'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('PG_SYNCHRONIZE'),
      }),

      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Product]),

    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'CONFIRM_STOCK_RESERVATION',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RMQ_URL') || 'amqp://localhost:5672',
            ],
            queue: configService.get<string>('STOCK_CONFIRMATION_QUEUE'),
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
