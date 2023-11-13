import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { categories } from 'src/modules/categories/entities/category.entity';
import { statuss } from '../entities/food-type.entity';

export class CreateFoodTypeDto {
  @IsNotEmpty()
  @MinLength(4)
  foodTypesName: string;

  status: statuss;

  @Type(() => categories)
  readonly categories: categories;
}