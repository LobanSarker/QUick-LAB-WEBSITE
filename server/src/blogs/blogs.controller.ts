import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/client.js';
import { BlogsService } from './blogs.service.js';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Public } from '../common/decorators/public.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Public()
  @Get()
  findAll(@Query('all') all?: string) {
    return this.blogsService.findAll(all === '1' || all === 'true');
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query('all') all?: string) {
    return this.blogsService.findOne(slug, all === '1' || all === 'true');
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateBlogDto, @CurrentUser('id') authorId: string) {
    return this.blogsService.create(dto, authorId);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.remove(id);
  }
}
