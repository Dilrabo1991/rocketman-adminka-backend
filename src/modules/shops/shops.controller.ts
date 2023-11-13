import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException,ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus, } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { Auth } from 'src/commons/decorators/auth.decorator';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {

  constructor(private readonly shopsService: ShopsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    try {
      return this.shopsService.create(createShopDto);
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
    return this.shopsService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        categories: true
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.shopsService.findById(id)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateShopDto,
  ) {
    return this.shopsService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.shopsService.delete(id);
  }

}
