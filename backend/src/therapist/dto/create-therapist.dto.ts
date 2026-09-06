import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTherapistDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Physiotherapist', required: false })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({ example: 'Chennai', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Batch A', required: false })
  @IsOptional()
  @IsString()
  batch?: string;

  @ApiProperty({ example: '2025-01-15', required: false })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty({ example: 'path/to/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
