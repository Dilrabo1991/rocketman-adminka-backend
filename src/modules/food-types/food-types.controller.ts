import { Controller, Get, Post, Body, HttpCode, Patch, Param, Delete, BadRequestException, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { FoodTypesService } from './food-types.service';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { UpdateFoodTypeDto } from './dto/update-food-type.dto';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { foods } from '../foods/entities/food.entity';

@Controller('foodTypes')
export class FoodTypesController {
  constructor(private readonly FoodTypesService: FoodTypesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() CreateFoodTypeDto: CreateFoodTypeDto) {
    try {      
      return this.FoodTypesService.create(CreateFoodTypeDto);
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
    return this.FoodTypesService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        categories: true,
        foods: true
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.FoodTypesService.findById(id)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateFoodTypeDto,
  ) {
    return this.FoodTypesService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.FoodTypesService.delete(id);
  }
}
