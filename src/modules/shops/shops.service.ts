import { BadRequestException, Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { shops } from './entities/shop.entity';



@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(shops)
    private readonly ShopRepository: Repository<shops>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    try {
      return await this.ShopRepository.save(
        this.ShopRepository.create(createShopDto),
      );
    } catch (error) {
      throw new BadRequestException() ;
      ;
    }
  }

  async page(filter: FindManyOptions<shops>) {
    try {
      const [data, total] = await this.ShopRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<shops>) {
    try {
      return await this.ShopRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  

  async findById(id: number,) {
    return await this.ShopRepository.find({
        where: {
            id: id
        },
        relations: {
          categories: true
        }
    });
  }

  async update(id: number, Body: UpdateShopDto) {
    return this.ShopRepository.update({id}, Body)
  }

  async delete(id: number) {
    return this.ShopRepository.delete({id})
  }
}
