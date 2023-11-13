import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/commons/decorators/auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleRepository.save(
        this.roleRepository.create(createRoleDto),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  find() {
    return this.roleRepository.find();
  }

  findByID(id: number) {
    return this.roleRepository.findOneBy({
      id: id,
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, {
      description: updateRoleDto.description,
    });
  }
}
