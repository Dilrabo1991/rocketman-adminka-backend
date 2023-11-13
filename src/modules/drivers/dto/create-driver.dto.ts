import { IsNotEmpty, MinLength } from 'class-validator';
import { statuss } from '../entities/driver.entity';

export class CreateDriverDto {
  @IsNotEmpty()
  @MinLength(12)
  fullname: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()  
  contact: string;

  @IsNotEmpty()
  car_number: string;

  @IsNotEmpty()
  car_name: string;

  status: statuss;
}
