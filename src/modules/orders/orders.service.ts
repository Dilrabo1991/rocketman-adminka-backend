import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { order } from './entities/orders.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(order)
    private readonly OrderRepository: Repository<order>,
  ) {}

  async create(CreateOrderDto: CreateOrderDto) {
    try {
      let ordercha = this.OrderRepository.create(CreateOrderDto);

      return await this.OrderRepository.save(ordercha);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async page() {
    try {
      return await this.OrderRepository.find({
        relations: {
          driver: true,
          foods: true,
          customer: true,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<order>) {
    try {
      return await this.OrderRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number) {
    return await this.OrderRepository.find({
      where: {
        id: id,
      },
      relations: {
        customer: true,
        driver: true,
        foods: true,
      },
    });
  }

  async update(id: number, Body: UpdateOrderDto) {
    return this.OrderRepository.update({ id }, Body);
  }

  async delete(id: number) {
    return this.OrderRepository.delete({ id });
  }
}
