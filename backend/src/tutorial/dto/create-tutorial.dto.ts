import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTutorialDto {
  @ApiProperty({ example: 'Back Pain Relief' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Stretching', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'A tutorial on back pain relief', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'path/to/thumb.jpg', required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ example: 'https://youtube.com/...', required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
