import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createData: any) {
    return this.feedbackService.create(createData);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.feedbackService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
