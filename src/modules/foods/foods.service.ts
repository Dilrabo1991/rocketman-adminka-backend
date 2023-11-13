import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { foods } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(foods)
    private readonly FoodRepository: Repository<foods>,
  ) {}

  async create(CreateFoodDto: CreateFoodDto) {
    try {
      let { food_name, information, cost, status, image, foodTypes } =
        CreateFoodDto;

      foodTypes = foodTypes[0].id;

      const res = await this.FoodRepository.save(
        this.FoodRepository.create({
          food_name,
          information,
          cost,
          status,
          image,
          foodTypes,
        }),
      );

      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async page(filter: FindManyOptions<foods>) {
    try {
      const [data, total] = await this.FoodRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<foods>) {
    try {
      return await this.FoodRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number) {
    return await this.FoodRepository.find({
      where: {
        id: id,
      },
      relations: {
        foodTypes: true,
      },
    });
  }

  async update(id: number, Body: UpdateFoodDto) {
    return this.FoodRepository.update({ id }, Body);
  }

  async delete(id: number) {
    return this.FoodRepository.delete({ id });
  }
}
