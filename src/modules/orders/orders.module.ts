import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { order } from './entities/orders.entity';
import { orderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([order])],
  controllers: [orderController],
  providers: [OrderService]
})
export class OrdersModule {}
