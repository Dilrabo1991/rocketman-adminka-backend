import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  async create(@Body() CreateFoodDto: CreateFoodDto) {
    console.log(CreateFoodDto);

    return await this.foodsService.create(CreateFoodDto);
  }

  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.foodsService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        foodTypes: true,
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.foodsService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() Body: UpdateFoodDto) {
    return this.foodsService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.foodsService.delete(id);
  }
}
