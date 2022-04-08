import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  @Index({ unique: true })
  link!: string;

  @Column({ type: 'text' })
  media!: string;

  @Column({ type: 'timestamp' })
  dateTaken!: Date;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'timestamp' })
  published!: Date;

  @Column({ type: 'text' })
  author!: string;

  @Column({ type: 'text' })
  authorId!: string;

  @Column({ type: 'text' })
  tags!: string;
}
