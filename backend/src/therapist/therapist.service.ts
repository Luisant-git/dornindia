import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TherapistService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.therapist.create({ data });
  }

  async getFilters() {
    const batches = await this.prisma.therapist.findMany({
      select: { batch: true },
      distinct: ['batch'],
      where: { batch: { not: null } }
    });
    
    const dates = await this.prisma.therapist.findMany({
      select: { date: true },
      distinct: ['date'],
      where: { date: { not: null } }
    });

    const uniqueBatches = batches.map(b => b.batch).filter(Boolean).sort();
    const uniqueYears = [...new Set(dates.map(d => d.date ? d.date.split('-')[0] : null).filter(Boolean))].sort();

    return { batches: uniqueBatches, years: uniqueYears };
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search = '', designation, isActive, startDate, endDate, batch, year } = query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { designation: { contains: search, mode: 'insensitive' } },
        { batch: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (designation) {
      where.designation = { contains: designation, mode: 'insensitive' };
    }

    if (isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    if (batch && batch !== 'all') {
      where.batch = batch;
    }

    if (year && year !== 'all') {
      where.date = { startsWith: year };
    }

    if (startDate || endDate) {
      where.date = where.date || {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const [items, total] = await Promise.all([
      this.prisma.therapist.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      this.prisma.therapist.count({ where }),
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
    const therapist = await this.prisma.therapist.findUnique({ where: { id } });
    if (!therapist) throw new NotFoundException(`Therapist with id ${id} not found`);
    return therapist;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.therapist.update({ where: { id }, data });
  }

  async toggleActive(id: number) {
    const therapist = await this.findOne(id);
    return this.prisma.therapist.update({
      where: { id },
      data: { isActive: !therapist.isActive },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.therapist.delete({ where: { id } });
  }
}
