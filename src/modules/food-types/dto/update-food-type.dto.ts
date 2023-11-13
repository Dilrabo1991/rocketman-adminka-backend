import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodTypeDto } from './create-food-type.dto';

export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {}
