import { Controller, Get, Post, Body, Param, Put, Delete, Query, Patch } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';

@ApiTags('therapists')
@Controller('therapists')
export class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post()
  create(@Body() createData: CreateTherapistDto) {
    return this.therapistService.create(createData);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.therapistService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.therapistService.findOne(+id);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.therapistService.toggleActive(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateTherapistDto) {
    return this.therapistService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.therapistService.remove(+id);
  }
}
