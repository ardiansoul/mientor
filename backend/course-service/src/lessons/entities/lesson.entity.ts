import { BaseEntity } from 'src/base.entity';
import { Module } from 'src/modules/entities/module.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @ManyToOne(() => Module, (module) => module.lessons)
  module: Module;

  @Column({ type: 'varchar', length: 255 })
  lessonName: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @Column({ type: 'jsonb', nullable: true })
  content?: Record<string, any>;

  @Column({ default: false })
  isActive: boolean;
}
