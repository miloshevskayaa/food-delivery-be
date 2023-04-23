import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from '@entities/user';

import { BaseEntity } from '../common';

@Entity('one_time_password')
export class OneTimePassword extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'otp',
    unique: true,
    length: 16,
  })
  otp: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
