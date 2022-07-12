import { Tag } from './entities/tag.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseReporitory: Repository<Course>,
    
    @Inject('TAGS_REPOSITORY')
    private readonly tagReporitory: Repository<Tag>
  ){}

  finAll() {
    return this.courseReporitory.find({
      relations:['tags']
    });
  }

  finOne(id: string) {
    const course = this.courseReporitory.findOne({
      where:{ id: id },
      relations:['tags']
    })
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDTO.tags.map(name => this.preloadTagByName(name))
    );
    const course = this.courseReporitory.create({
      ...createCourseDTO,
      tags,
    });
    return this.courseReporitory.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const tags = updateCourseDTO.tags && (
      await Promise.all(
        updateCourseDTO.tags.map(name => this.preloadTagByName(name))
      )
    )
    const course = await this.courseReporitory.preload({
      id: id,
      ...updateCourseDTO,
      tags
    });
    if(!course){
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseReporitory.save(course)
  }

  async delete(id: string) {
    const course = await this.courseReporitory.findOne({
      where:{ id: id },
      relations:['tags']
    })
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseReporitory.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag>{
    const tag = await this.tagReporitory.findOne({where: {name: name}})

    if(tag){
      return tag;
    }

    return this.tagReporitory.create({ name: name });

  }

}
