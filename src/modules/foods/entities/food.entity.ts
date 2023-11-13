import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/commons/entities/BaseEntity';
import { foodTypes } from 'src/modules/food-types/entities/food-type.entity';
import { shops } from 'src/modules/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum statuss {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}
@Entity('foods')
export class foods extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  food_name: string;

  @Column()
  information: string;

  @Column()
  cost: number;

  @Column({ nullable: true })
  status: string;

  @Column()
  image: string;

  @ManyToOne(() => foodTypes, (foodTypes) => foodTypes.foods, {
    nullable: false,
  })
  foodTypes: foodTypes;
}
