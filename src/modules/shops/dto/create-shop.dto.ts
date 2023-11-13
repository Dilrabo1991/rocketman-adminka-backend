import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { categories } from 'src/modules/categories/entities/category.entity';
import { statuss } from '../entities/shop.entity';

export class CreateShopDto {
  @IsNotEmpty()
  @MinLength(4)
  shops_name: string;

  status: statuss;
}