import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException,Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() CreateCategoryDto: CreateCategoryDto) {
    try {
      return this.categoriesService.create(CreateCategoryDto);
    } catch (error) { 
      throw new BadRequestException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.categoriesService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        foodTypes: true
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesService.findById(id)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesService.delete(id);
  }
}
