import { Column, Entity } from 'typeorm';

@Entity('user', { schema: 'sesions' })
export class UserEntity {
  @Column('varchar', { primary: true, name: 'id', length: 220 })
  id: string;

  @Column('varchar', { name: 'user_name', length: 45 })
  userName: string;

  @Column('varchar', { name: 'password', length: 45 })
  password: string;
}
