import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Yoga Beginners' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Learn the basics of Yoga.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '10:00 AM', required: false })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiProperty({ example: '2023-12-01', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  instructor?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
