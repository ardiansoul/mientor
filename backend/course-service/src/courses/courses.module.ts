import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepositoryProvider } from './courses-repository.provider';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepositoryProvider],
})
export class CoursesModule {}
