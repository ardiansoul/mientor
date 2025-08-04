import { DataSource } from 'typeorm';
import { CoursesRepository } from './courses.repository';

export const CoursesRepositoryProvider = {
  provide: 'CoursesRepository',
  useFactory: (dataSource: DataSource) => {
    return new CoursesRepository(dataSource);
  },
  inject: [DataSource],
};
