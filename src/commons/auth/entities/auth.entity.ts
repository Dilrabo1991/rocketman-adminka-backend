import { User } from 'src/commons/user/entities/user.entity';

export class Auth {
  user: User;
  iat: number;
  exp: number;
}
