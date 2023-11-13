import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  // @MinLength(12)
  fullname: string;

  @IsNotEmpty()  
  contact: string;
}
