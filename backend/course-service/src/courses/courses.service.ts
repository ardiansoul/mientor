import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('CoursesRepository')
    private readonly coursesRepository: CoursesRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.coursesRepository.createCourse(createCourseDto);
  }

  async findAll() {
    return await this.coursesRepository.findAllCourses();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
