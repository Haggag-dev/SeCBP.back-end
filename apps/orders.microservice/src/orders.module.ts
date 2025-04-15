import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Order } from './entities/orders.entity';

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
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
