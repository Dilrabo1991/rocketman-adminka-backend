import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Role } from 'src/commons/role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly login: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Role)
  readonly roles: Role[];
}
