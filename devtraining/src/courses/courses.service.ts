import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseReporitory: Repository<Course>
  ){}

  finAll() {
    return this.courseReporitory.find();
  }

  finOne(id: string) {
    const course = this.courseReporitory.findOne({
      where:{ "id": +id }
    })
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return course;
  }

  create(createCourseDTO: CreateCourseDto) {
    const course = this.courseReporitory.create(createCourseDTO);
    return this.courseReporitory.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const course = await this.courseReporitory.preload({
      "id": +id,
      ...updateCourseDTO,
    });
    if(!course){
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseReporitory.save(course)
  }

  async delete(id: string) {
    const course = await this.courseReporitory.findOne({
      where:{ "id": +id }
    })
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseReporitory.remove(course);
  }
}
