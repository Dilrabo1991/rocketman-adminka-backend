import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import { foodTypes } from 'src/modules/food-types/entities/food-type.entity';
import { statuss } from '../entities/food.entity';

export class CreateFoodDto {
  @MinLength(3)
  food_name: string;

  @MinLength(4)
  @IsNotEmpty()
  information: string;

  @IsNotEmpty()
  cost: number;

  status: statuss;

  @IsNotEmpty()
  image: string;

  @Type(() => foodTypes)
  readonly foodTypes: foodTypes;
}
