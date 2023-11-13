import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException,ParseIntPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { DriverService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';


@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    try {
      return this.driverService.create(createDriverDto);
    } catch (error) { 
      throw new BadRequestException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.driverService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        orders: true
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.driverService.findById(id)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateDriverDto,
  ) {
    return this.driverService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.driverService.delete(id);
  }
}
