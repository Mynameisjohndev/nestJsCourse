import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso de js',
      tags: ['top', 'js', 'JAVASCRIPT'],
    },
  ];

  finAll() {
    return this.courses;
  }

  finOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  update(id: string, updateCourseDTO: any) {
    const course = this.courses.findIndex((course) => course.id === Number(id));
    this.courses[course] = updateCourseDTO;
  }

  delete(id: string) {
    const course = this.courses.findIndex((course) => course.id === Number(id));
    if (course >= 0) {
      this.courses.splice(course, 1);
    }
  }
}
