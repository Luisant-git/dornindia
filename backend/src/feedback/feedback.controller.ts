import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createData: CreateFeedbackDto) {
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
  update(@Param('id') id: string, @Body() updateData: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
