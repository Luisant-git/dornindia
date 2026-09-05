import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.feedback.create({ data });
  }

  findAll() {
    return this.prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.feedback.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.feedback.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.feedback.delete({ where: { id } });
  }
}
