import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Yoga Beginners' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Seminar', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: '2025-01-15', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ example: '2025-01-18', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ example: '3', required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ example: 'Learn the basics of Yoga.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'path/to/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
