import { order } from 'src/modules/orders/entities/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum statuss {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  birthday: string;

  @Column()
  contact: string;

  @Column()
  car_number: string;

  @Column()
  car_name: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => order, (ord) => ord.driver)
  orders: order[];
}
