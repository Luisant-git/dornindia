import { Controller, Get, Post, Body, Param, Put, Delete, Query, Patch } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags('classes')
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createData: CreateClassDto) {
    return this.classService.create(createData);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.classService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.classService.toggleActive(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateClassDto) {
    return this.classService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
