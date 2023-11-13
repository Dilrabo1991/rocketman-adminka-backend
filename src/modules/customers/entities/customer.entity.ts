import { order } from 'src/modules/orders/entities/orders.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
// import { Question } from 'src/modules/questions/entities/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  contact: string;

  @OneToMany(() => order, (ord) => ord.customer)
  orders: order[];

  @OneToMany(() => Question, (Question) => Question.customer)
  Question: Question[];
}
