import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';
import { Public } from '../common/decorators/public.decorator.js';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  findAll() {
    return this.prisma.person.findMany({ orderBy: { sortOrder: 'asc' } });
  }
}
