import { Controller, Post, Body, Response, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User as AuthUser } from 'src/commons/user/entities/user.entity';
import { User } from 'src/commons/decorators/user.decorator';
import { Auth } from 'src/commons/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Auth()
  @Post('me')
  @HttpCode(200)
  me(@User() user: AuthUser) {
    return user;
  }
}
