import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 'Great class!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
