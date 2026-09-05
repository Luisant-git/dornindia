import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TherapistService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.therapist.create({ data });
  }

  findAll() {
    return this.prisma.therapist.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.therapist.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.therapist.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.therapist.delete({ where: { id } });
  }
}
