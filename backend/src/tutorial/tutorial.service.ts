import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TutorialService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.tutorial.create({ data });
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search = '', category, isActive } = query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const [items, total] = await Promise.all([
      this.prisma.tutorial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      this.prisma.tutorial.count({ where }),
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
    const tutorial = await this.prisma.tutorial.findUnique({ where: { id } });
    if (!tutorial) throw new NotFoundException(`Tutorial with id ${id} not found`);
    return tutorial;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.tutorial.update({ where: { id }, data });
  }

  async toggleActive(id: number) {
    const tutorial = await this.findOne(id);
    return this.prisma.tutorial.update({
      where: { id },
      data: { isActive: !tutorial.isActive },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tutorial.delete({ where: { id } });
  }
}
