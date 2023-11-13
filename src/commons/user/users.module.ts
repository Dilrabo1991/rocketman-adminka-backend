import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RolesModule } from '../role/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, RolesModule],
})
export class UsersModule {}
