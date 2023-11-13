import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categories } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(categories)
    private readonly CategoriesRepository: Repository<categories>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto) {
    try {
        let {categories_name, contact, address, status, shops} = CreateCategoryDto
          shops = shops[0].id;
        
      const res = await this.CategoriesRepository.save(
        this.CategoriesRepository.create({categories_name, contact, address, status, shops}),
      );
      return res
    } catch (error) {
      throw new BadRequestException() ;
      ;
    }
  }

  async page(filter: FindManyOptions<categories>) {
    try {
      const [data, total] = await this.CategoriesRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async filter(filter?: FindManyOptions<categories>) {
    try {
      return await this.CategoriesRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number,) {
    return await this.CategoriesRepository.find({
        where: {
            id: id
        },
        relations: {
          foodTypes: true
        }
    });
}

  update(id: number, Body: UpdateCategoryDto) {
    
    return this.CategoriesRepository.update( { id } , Body)
  }

  delete(id: number) {
    return this.CategoriesRepository.delete( { id } )
  }
}
