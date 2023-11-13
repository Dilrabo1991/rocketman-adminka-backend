import { IsNotEmpty } from 'class-validator';
import { BaseEntity} from 'src/commons/entities/BaseEntity';
import { foodTypes } from 'src/modules/food-types/entities/food-type.entity';
import {  shops} from 'src/modules/shops/entities/shop.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum statuss {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}
@Entity('categories')
export class categories extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categories_name: string;

  @Column()
  contact: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: statuss,
    default: statuss.ENABLED,
  })
  status: statuss;

  @ManyToOne(() => shops, (shops) => shops.categories, {nullable: false})
  shops: shops;

  @OneToMany(() => foodTypes, (foodTypes) => foodTypes.categories)
  foodTypes: foodTypes[]

}


