import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Order } from './entities/orders.entity';
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
        host: configService.getOrThrow<string>('PG_HOST_O'),
        port: +configService.getOrThrow<string>('PG_PORT_O'),
        username: configService.getOrThrow<string>('PG_USERNAME_O'),
        password: configService.getOrThrow<string>('PG_PASSWORD_O'),
        database: configService.getOrThrow<string>('PG_NAME_O'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('PG_SYNCHRONIZE_O'),
      }),

      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Order]),

    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'RESERVE_STOCK',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RMQ_URL') || 'amqp://localhost:5672',
            ],
            queue: configService.get<string>('STOCK_RESERVATION_QUEUE'),
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
