import { BaseEntity } from 'src/commons/entities/BaseEntity';
import { Role } from 'src/commons/role/entities/role.entity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  login: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @Column({ select: false })
  password: string;

  @Column({ nullable: true, name: 'last_visit' })
  lastVisit: Date;
}
