import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tutorials')
@Controller('tutorials')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post()
  create(@Body() createData: any) {
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
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.tutorialService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorialService.remove(+id);
  }
}
