import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    try {
      return await this.driverRepository.save(
        this.driverRepository.create(createDriverDto)
      );
    } catch (error) {
      throw new BadRequestException() ;
      ;
    }
  }

  async page(filter: FindManyOptions<Driver>) {
    try {
      const [data, total] = await this.driverRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<Driver>) {
    try {
      return await this.driverRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number) {
    return await this.driverRepository.find({
        where: {
            id: id
        },
        relations: {
          orders: true
        }
    });
  }

  async update(id: number, Body: UpdateDriverDto) {
    return this.driverRepository.update({id}, Body)
  }

  async delete(id: number) {
    return this.driverRepository.delete({id})
  }
}
