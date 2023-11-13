import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { categories } from '../categories/entities/category.entity';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { UpdateFoodTypeDto } from './dto/update-food-type.dto';
import { foodTypes } from './entities/food-type.entity';

@Injectable()
export class FoodTypesService {

  constructor(
    @InjectRepository(foodTypes)
    private readonly FoodTypeRepository: Repository<foodTypes>,
  ) {}
  
  async create(CreateFoodTypeDto: CreateFoodTypeDto) {
    try {
      let {foodTypesName, status, categories} = CreateFoodTypeDto
        categories = categories[0].id;

      const res = await this.FoodTypeRepository.save(
        this.FoodTypeRepository.create({foodTypesName, status, categories}),
      );
      
      return res
    } catch (error) {
      throw new BadRequestException() ;
      ;
    }
  }

  async page(filter: FindManyOptions<foodTypes>) {
    try {
      const [data, total] = await this.FoodTypeRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async filter(filter?: FindManyOptions<foodTypes>) {
    try {
      return await this.FoodTypeRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number,) {
    return await this.FoodTypeRepository.find({
        where: {
            id: id
        },
    });
  }

  async update(id: number, Body: UpdateFoodTypeDto) {
    return this.FoodTypeRepository.update({id}, Body)
  }

  async delete(id: number) {
    return this.FoodTypeRepository.delete({id})
  }
}
