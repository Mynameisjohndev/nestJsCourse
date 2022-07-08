import { CreateCourseDto } from './create-course.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
