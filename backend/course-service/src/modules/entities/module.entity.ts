import { BaseEntity } from 'src/base.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'modules' })
export class Module extends BaseEntity {
  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @Column({ type: 'varchar', length: 255 })
  moduleName: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @Column({ default: false })
  isActive: boolean;
}
