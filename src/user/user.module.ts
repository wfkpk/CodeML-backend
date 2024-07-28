import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseAuthStrategy } from 'src/firebase/firebase-auth.strategy';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAuthGuard } from 'src/guard/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    FirebaseAuthStrategy,
    FirebaseAuthGuard,
    UserAuthGuard,
  ],
})
export class UserModule {}
