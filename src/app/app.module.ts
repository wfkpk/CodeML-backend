import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubmissionModule } from 'src/submission/submission.module';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, SubmissionModule, QuestionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
