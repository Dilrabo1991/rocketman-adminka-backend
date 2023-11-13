import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password);

      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async page(filter: FindManyOptions<User>) {
    try {
      const [data, total] = await this.usersRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<User>) {
    try {
      return await this.usersRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(filter: FindOneOptions<User>) {
    try {
      return await this.usersRepository.findOneOrFail(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const keys = Object.keys(updateUserDto);

      if (!keys.length) {
        throw new BadRequestException();
      }

      const password = updateUserDto.password;

      if (password) {
        updateUserDto.password = await this.hashPassword(password);
      }

      const user = await this.usersRepository.findOne({
        where: {
          id,
        },
        relations: {
          roles: true,
        },
      });

      keys.forEach((key) => {
        if (updateUserDto[key]) {
          user[key] = updateUserDto[key];
        }
      });

      user.id = id;

      // user.updatedAt = new Date();

      await this.usersRepository.save(user);

      return this.usersRepository.findOne({
        where: {
          id,
        },
        relations: {
          roles: true,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateOne(id: number) {
    try {
      await this.usersRepository.update(id, {
        lastVisit: new Date(),
      });
    } catch (error) {}
  }

  //---utils
  async hashPassword(password: string) {
    const [{ result }] = await this.usersRepository.query(
      `select HASH_MAKE('${password}') as result`,
    );

    return result;
  }
}
