import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    const normalized = email.toLowerCase();
    const existing = await this.prisma.subscriber.findUnique({
      where: { email: normalized },
    });
    if (existing)
      throw new ConflictException('This email is already subscribed');
    return this.prisma.subscriber.create({ data: { email: normalized } });
  }

  findAll() {
    return this.prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async remove(id: string) {
    await this.prisma.subscriber.delete({ where: { id } });
    return { deleted: true };
  }
}
