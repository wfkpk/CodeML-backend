import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseAuthStrategy } from 'src/firebase/firebase-auth.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionService, FirebaseAuthStrategy],
})
export class QuestionModule {}
