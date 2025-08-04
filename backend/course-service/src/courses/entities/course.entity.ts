import { BaseEntity } from 'src/base.entity';
import { Module } from 'src/modules/entities/module.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'varchar', length: 255 })
  courseName: string;

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  @Column({ type: 'uuid' })
  creatorId: string;
}
