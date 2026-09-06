import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, pass: string, name?: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.prisma.admin.create({
      data: { email, password: hashedPassword, name },
    });
    return { id: user.id, email: user.email };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.admin.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email is not registered');
    }
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid password');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
