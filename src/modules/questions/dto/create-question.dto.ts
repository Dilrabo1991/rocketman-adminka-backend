import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { categories } from 'src/modules/categories/entities/category.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { foods } from 'src/modules/foods/entities/food.entity';

export class CreateQuestionDto {
  // @Type(() => Customer)
  // readonly customer: Customer;


  body: string;

  // chatId: number
}
