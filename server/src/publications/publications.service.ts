import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreatePublicationDto,
  PublicationQueryDto,
  UpdatePublicationDto,
} from './dto/publication.dto.js';

@Injectable()
export class PublicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PublicationQueryDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const where: Prisma.PublicationWhereInput = {};
    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: 'insensitive' } },
        { venue: { contains: query.q, mode: 'insensitive' } },
        { abstract: { contains: query.q, mode: 'insensitive' } },
        { authors: { has: query.q } },
      ];
    }
    if (query.year) where.year = query.year;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.publication.findMany({
        where,
        orderBy: [{ year: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.publication.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    const pub = await this.prisma.publication.findUnique({ where: { id } });
    if (!pub) throw new NotFoundException('Publication not found');
    return pub;
  }

  create(dto: CreatePublicationDto, authorId: string) {
    return this.prisma.publication.create({
      data: { ...dto, authorId },
    });
  }

  async update(id: number, dto: UpdatePublicationDto) {
    const existing = await this.prisma.publication.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Publication not found');
    return this.prisma.publication.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const existing = await this.prisma.publication.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Publication not found');
    await this.prisma.publication.delete({ where: { id } });
    return { deleted: true };
  }
}
