import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.class.create({ data });
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search = '', category, isActive, startDate, endDate } = query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { duration: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    if (startDate || endDate) {
      where.startDate = {};
      if (startDate) where.startDate.gte = startDate;
      if (endDate) where.startDate.lte = endDate;
    }

    const [items, total] = await Promise.all([
      this.prisma.class.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      this.prisma.class.count({ where }),
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
    const cls = await this.prisma.class.findUnique({ where: { id } });
    if (!cls) throw new NotFoundException(`Class with id ${id} not found`);
    return cls;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.class.update({ where: { id }, data });
  }

  async toggleActive(id: number) {
    const cls = await this.findOne(id);
    return this.prisma.class.update({
      where: { id },
      data: { isActive: !cls.isActive },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.class.delete({ where: { id } });
  }
}
