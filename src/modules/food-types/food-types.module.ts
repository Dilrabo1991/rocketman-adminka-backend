import { Module } from '@nestjs/common';
import { FoodTypesService } from './food-types.service';
import { FoodTypesController } from './food-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { foodTypes } from './entities/food-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([foodTypes])],
  controllers: [FoodTypesController],
  providers: [FoodTypesService]
})
export class FoodTypesModule {}
