import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { foods } from './entities/food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([foods])],
  controllers: [FoodsController],
  providers: [FoodsService]
})
export class FoodsModule {}
