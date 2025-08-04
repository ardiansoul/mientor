import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Course name is required' })
  @IsString({ message: 'Course name must be a string' })
  courseName: string;
}
