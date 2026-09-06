import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [therapists, classes, tutorials, feedbacks] = await Promise.all([
      this.prisma.therapist.count(),
      this.prisma.class.count(),
      this.prisma.tutorial.count(),
      this.prisma.feedback.count(),
    ]);

    return {
      therapists,
      classes,
      tutorials,
      testimonials: feedbacks,
    };
  }
}
