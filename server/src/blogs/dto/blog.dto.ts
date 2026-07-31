import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BlogStatus } from '../../../generated/prisma/client.js';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class CreateBlogDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @Matches(slugPattern, { message: 'slug must be lowercase with hyphens' })
  slug?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @Matches(slugPattern, { message: 'slug must be lowercase with hyphens' })
  slug?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
