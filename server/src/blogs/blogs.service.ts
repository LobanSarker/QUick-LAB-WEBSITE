import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogStatus, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto.js';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const listSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  cover: true,
  tags: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  author: { select: { id: true, name: true, email: true } },
} satisfies Prisma.BlogSelect;

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeDrafts: boolean) {
    const where: Prisma.BlogWhereInput = includeDrafts
      ? {}
      : { status: BlogStatus.PUBLISHED };
    return this.prisma.blog.findMany({
      where,
      select: listSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string, includeDrafts: boolean) {
    const where: Prisma.BlogWhereInput = includeDrafts
      ? { slug }
      : { slug, status: BlogStatus.PUBLISHED };
    const blog = await this.prisma.blog.findFirst({
      where,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!blog) throw new NotFoundException('Blog post not found');
    return blog;
  }

  async create(dto: CreateBlogDto, authorId: string) {
    const slug = dto.slug ?? slugify(dto.title);
    try {
      return await this.prisma.blog.create({
        data: {
          title: dto.title,
          slug,
          content: dto.content,
          excerpt: dto.excerpt ?? '',
          tags: dto.tags ?? [],
          cover: dto.cover ?? null,
          status: dto.status ?? BlogStatus.PUBLISHED,
          authorId,
        },
      });
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(
          `A post with the slug "${slug}" already exists. Choose a different title or provide a unique slug.`,
        );
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdateBlogDto) {
    const existing = await this.prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Blog post not found');
    const data: Prisma.BlogUpdateInput = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.slug !== undefined) data.slug = dto.slug;
    if (dto.content !== undefined) data.content = dto.content;
    if (dto.excerpt !== undefined) data.excerpt = dto.excerpt;
    if (dto.tags !== undefined) data.tags = dto.tags;
    if (dto.cover !== undefined) data.cover = dto.cover;
    if (dto.status !== undefined) data.status = dto.status;
    try {
      return await this.prisma.blog.update({ where: { id }, data });
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(
          `A post with the slug "${dto.slug ?? ''}" already exists.`,
        );
      }
      throw error;
    }
  }

  private isUniqueViolation(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    );
  }

  async remove(id: number) {
    const existing = await this.prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Blog post not found');
    await this.prisma.blog.delete({ where: { id } });
    return { deleted: true };
  }
}
