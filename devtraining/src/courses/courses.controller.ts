import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(200).send('Listagem de cursos');
  }

  @Get(':id')
  finOnde(@Param('id') id: string) {
    return `Curso número #${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body('name') name: string) {
    return name;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `Curso atualizado número #${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Curso número #${id} removido`;
  }
}
