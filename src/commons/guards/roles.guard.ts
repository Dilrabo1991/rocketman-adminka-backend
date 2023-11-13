import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/commons/auth/auth.service';

type Headers = {
  authorization?: string;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      const request = context.switchToHttp().getRequest();

      const headers: Headers = request.headers;

      const { authorization = '' } = headers;

      if (!authorization) {
        throw new UnauthorizedException();
      }

      const payload = authorization.replace('Bearer ', '');

      const { user } = this.jwtService.decode(payload);

      if (!roles?.length) {
        request.user = user;
        return true;
      }

      if (!roles.some((name) => user.roles.some((role) => role.name == name))) {
        throw new ForbiddenException();
      }
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException();
    }

    return true;
  }
}
