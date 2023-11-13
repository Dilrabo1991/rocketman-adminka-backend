import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categories } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
