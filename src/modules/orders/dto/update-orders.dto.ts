
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-orders.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
