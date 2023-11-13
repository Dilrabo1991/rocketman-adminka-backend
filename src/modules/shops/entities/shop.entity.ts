import { BaseEntity} from 'src/commons/entities/BaseEntity';
import { categories } from 'src/modules/categories/entities/category.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum statuss {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}

@Entity('shops')
export class shops extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shops_name: string;

  @Column({
    type: 'enum',
    enum: statuss,
    default: statuss.ENABLED,
  })
  status: statuss;

  @OneToMany(() => categories, (categories) => categories.shops)
  categories: categories[]
}




