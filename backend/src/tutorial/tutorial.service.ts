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

  async getYoutubeInfo(url: string) {
    try {
      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        return { duration: '' };
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      const html = await response.text();

      const match = html.match(/"lengthSeconds":"(\d+)"/);
      if (match && match[1]) {
        const totalSeconds = parseInt(match[1], 10);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        return { duration };
      }
      return { duration: '' };
    } catch (error) {
      return { duration: '' };
    }
  }
}
