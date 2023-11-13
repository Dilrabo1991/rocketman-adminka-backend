import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus, HttpCode, Query, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PagePipe } from 'src/commons/pipes/PagePipe';
import { PerPagePipe } from 'src/commons/pipes/PerPagePipe';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}


  
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() CreateQuestionDto: CreateQuestionDto) {
    try {
      return this.questionsService.create(CreateQuestionDto);
    } catch (error) { 
      console.log(error);
      
      throw new BadRequestException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(
    @Query('page', PagePipe) page: number,
    @Query('per_page', PerPagePipe) perPage: number,
  ) {
    return this.questionsService.page({
      skip: perPage * page,
      take: perPage,
      order: {
        id: 'DESC',
      },
      relations: {
        customer: true
      }
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.findById(id)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, Body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.delete(id);
  }

}
