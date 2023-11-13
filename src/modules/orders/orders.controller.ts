import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Auth } from 'src/commons/decorators/auth.decorator';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';
import { CreateOrderDto } from './dto/create-orders.dto';
import { OrderService } from './orders.service';

@Controller('order')
export class orderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() CreateOrderDto: CreateOrderDto) {
    return await this.orderService.create(CreateOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.page();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() Body: CreateOrderDto) {
    return this.orderService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}
