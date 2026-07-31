import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  venue: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  authors: string[];

  @IsOptional()
  @IsString()
  abstract?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}

export class PublicationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number;
}
