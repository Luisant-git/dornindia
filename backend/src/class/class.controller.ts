import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
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
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
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
