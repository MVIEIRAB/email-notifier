import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  expireAt: string;
}
