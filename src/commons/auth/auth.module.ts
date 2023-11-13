import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRED },
      }),
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, UsersModule],
})
export class AuthModule {}
