import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Auth } from '../decorators/auth.decorator';

// @Auth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Auth()
  @Get()
  find() {
    return this.rolesService.find();
  }

  @Auth()
  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.rolesService.findByID(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
}
