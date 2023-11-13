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
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this.customerService.create(createCustomerDto);
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
    return this.customerService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.delete(id);
  }
}
