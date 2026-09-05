import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@ApiTags('tutorials')
@Controller('tutorials')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post()
  create(@Body() createData: CreateTutorialDto) {
    return this.tutorialService.create(createData);
  }

  @Get()
  findAll() {
    return this.tutorialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorialService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateTutorialDto) {
    return this.tutorialService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorialService.remove(+id);
  }
}
