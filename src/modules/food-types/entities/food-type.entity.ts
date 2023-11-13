import { BaseEntity} from 'src/commons/entities/BaseEntity';
import { categories } from 'src/modules/categories/entities/category.entity';
import { foods } from 'src/modules/foods/entities/food.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


export enum statuss {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}

@Entity('foodTypes')
export class foodTypes extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodTypesName: string;

  @Column({
    type: 'enum',
    enum: statuss,
    default: statuss.ENABLED,
  })
  status: statuss;

  @ManyToOne(() => categories, (categories) => categories.foodTypes, {nullable: false})
  categories: categories;

  @OneToMany(() => foods, (foods) => foods.foodTypes)
  foods: foods[]
}




