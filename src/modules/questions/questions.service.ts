import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question)
    private readonly QuestionRepository: Repository<Question>,
  ) {}

  async create(CreateQuestionDto: CreateQuestionDto) {
    try {
      return await this.QuestionRepository.save(
        this.QuestionRepository.create(CreateQuestionDto),
      );
    } catch (error) {
      console.log(error);
      
      throw new BadRequestException(error) ;
      ;
    }
  }


  async page(filter: FindManyOptions<Question>) {
    try {
      const [data, total] = await this.QuestionRepository.findAndCount(filter);

      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async filter(filter?: FindManyOptions<Question>) {
    try {
      return await this.QuestionRepository.findAndCount(filter);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findById(id: number) {
    return await this.QuestionRepository.find({
      where: {
        id: id,
      },
      relations: {
        customer: true,
      },
    });
  }

  async update(id: number, Body: UpdateQuestionDto) {
    return this.QuestionRepository.update({ id }, Body);
  }

  async delete(id: number) {
    return this.QuestionRepository.delete({ id });
  }
}
