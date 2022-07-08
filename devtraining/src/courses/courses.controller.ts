import { CreateCourseDto } from './dto/create-course.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CourseService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.finAll();
  }

  @Get(':id')
  finOnde(@Param('id') id: string) {
    return this.courseService.finOne(id);
  }

  @Post()
  create(@Body() crateCourseDto: CreateCourseDto) {
    return this.courseService.create(crateCourseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() crateCourseDto: CreateCourseDto) {
    return this.courseService.update(id, crateCourseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
