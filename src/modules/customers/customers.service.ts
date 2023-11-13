import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customerRepository.save(
        this.customerRepository.create(createCustomerDto)
      );
    } catch (error) {
      throw new BadRequestException() ;
      ;
    }
  }

  async page(filter: FindManyOptions<Customer>) {
    try {
      const [data, total] = await this.customerRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<Customer>) {
    try {
      return await this.customerRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number) {
    return await this.customerRepository.find({
        where: {
            id: id
        }
    });
  }

  async update(id: number, Body: UpdateCustomerDto) {
    return this.customerRepository.update({id}, Body)
  }

  async delete(id: number) {
    return this.customerRepository.delete({id})
  }
}
