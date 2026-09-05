import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.class.create({ data });
  }

  findAll() {
    return this.prisma.class.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.class.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.class.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.class.delete({ where: { id } });
  }
}
