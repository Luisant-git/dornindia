import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { TherapistModule } from './therapist/therapist.module';
import { ClassModule } from './class/class.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { UploadModule } from './upload/upload.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    TherapistModule,
    ClassModule,
    FeedbackModule,
    TutorialModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
