import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';
import { Public } from '../common/decorators/public.decorator.js';

@ApiTags('Research Areas')
@Controller('research-areas')
export class ResearchAreasController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  findAll() {
    return this.prisma.researchArea.findMany({ orderBy: { sortOrder: 'asc' } });
  }
}
