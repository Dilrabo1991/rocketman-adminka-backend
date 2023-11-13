import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly login: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
