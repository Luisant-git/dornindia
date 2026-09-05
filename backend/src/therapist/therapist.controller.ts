import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('therapists')
@Controller('therapists')
export class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post()
  create(@Body() createData: any) {
    return this.therapistService.create(createData);
  }

  @Get()
  findAll() {
    return this.therapistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.therapistService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.therapistService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.therapistService.remove(+id);
  }
}
