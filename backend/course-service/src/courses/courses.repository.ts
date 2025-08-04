import { DataSource, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

export class CoursesRepository extends Repository<Course> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const course = this.create(courseData);
    return this.save(course);
  }

  async findAllCourses(): Promise<Course[]> {
    return this.find();
  }

  async findCourseById(id: string): Promise<Course | null> {
    return this.findOne({ where: { id } });
  }

  async updateCourse(
    id: string,
    courseData: Partial<Course>,
  ): Promise<Course | null> {
    await this.update(id, courseData);
    return this.findOne({ where: { id } });
  }

  async deleteCourse(id: string): Promise<void> {
    await this.delete(id);
  }
}
