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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/client.js';
import { PublicationsService } from './publications.service.js';
import {
  CreatePublicationDto,
  PublicationQueryDto,
  UpdatePublicationDto,
} from './dto/publication.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Public } from '../common/decorators/public.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Public()
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'year', required: false })
  findAll(@Query() query: PublicationQueryDto) {
    return this.publicationsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  create(
    @Body() dto: CreatePublicationDto,
    @CurrentUser('id') authorId: string,
  ) {
    return this.publicationsService.create(dto, authorId);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseGuards(RolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePublicationDto,
  ) {
    return this.publicationsService.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.remove(id);
  }
}
