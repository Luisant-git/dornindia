import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Physiotherapist', required: false })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty({ example: 5, required: false, default: 5 })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 'Great class!', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({ example: 'path/to/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
