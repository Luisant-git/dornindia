import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TutorialService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.tutorial.create({ data });
  }

  findAll() {
    return this.prisma.tutorial.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.tutorial.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.tutorial.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.tutorial.delete({ where: { id } });
  }
}
