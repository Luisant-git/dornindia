import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.feedback.create({ data });
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search = '', rating, isActive } = query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { profession: { contains: search, mode: 'insensitive' } },
        { feedback: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (rating !== undefined && rating !== '') {
      where.rating = Number(rating);
    }

    if (isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const [items, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return {
      items,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  async findOne(id: number) {
    const feedback = await this.prisma.feedback.findUnique({ where: { id } });
    if (!feedback) throw new NotFoundException(`Feedback with id ${id} not found`);
    return feedback;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.feedback.update({ where: { id }, data });
  }

  async toggleActive(id: number) {
    const feedback = await this.findOne(id);
    return this.prisma.feedback.update({
      where: { id },
      data: { isActive: !feedback.isActive },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.feedback.delete({ where: { id } });
  }
}
