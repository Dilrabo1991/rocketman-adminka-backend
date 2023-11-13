import { BaseEntity } from 'src/commons/entities/BaseEntity';
import { categories } from 'src/modules/categories/entities/category.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { foods } from 'src/modules/foods/entities/food.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum statuss {
  ORDERED = 'order',
  ACCEPTANCE = 'acceptance',
  DELIVER = 'deliver',
  THE_END = 'the end',
  CANCELED = 'canceled',
  IS_BEING_PREPARED = 'is being prepared',
}

@Entity('orders')
export class order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @CreateDateColumn({ name: 'order_time' })
  orderTime: Date;

  @Column()
  phone: string;

  @Column()
  adress: string;

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => Driver, (driver) => driver.orders)
  driver: Driver;

  @ManyToMany(() => foods)
  @JoinTable()
  foods: foods[];

  @Column('text', { nullable: true, array: true })
  locations: string[];

  @Column({ nullable: true })
  count: number;
}
