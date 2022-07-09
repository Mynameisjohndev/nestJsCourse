import { coursesProviders } from './courses.providers';
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseService } from './courses.service';
import { DatabaseModule } from './../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [CourseService, ...coursesProviders],
})
export class CoursesModule {}
