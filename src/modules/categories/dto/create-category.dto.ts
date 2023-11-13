import { Type } from 'class-transformer';
import {
  IsNotEmpty, MinLength, 
} from 'class-validator';
import { shops } from 'src/modules/shops/entities/shop.entity';
import { statuss } from '../entities/category.entity';



export class CreateCategoryDto {
  // @IsNotEmpty()
  categories_name: string;

  @MinLength(4)
  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  address: string;

  status: statuss;

  @Type(() => shops)
  readonly shops: shops;
}