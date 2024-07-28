import { Injectable, BadGatewayException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseAuthStrategy } from 'src/firebase/firebase-auth.strategy';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseAuthStrategy,
  ) {}

  async createUser(token: string) {
    const firebaseUser = await this.firebase.validate(token);

    const firebaseUid = firebaseUser.uid;
    const firebaseEmail = firebaseUser.email;

    const alreadyUser = await this.prisma.user.findUnique({
      where: {
        email: firebaseEmail as string,
      },
    });

    if (alreadyUser) {
      throw new BadGatewayException('User already exists');
    }

    //slash email id before the @ symbol and store it in username
    const username = firebaseEmail.split('@')[0];
    const user = await this.prisma.user.create({
      data: {
        email: firebaseEmail as string,
        firebaseUid: firebaseUid,
        username: username,
      },
    });

    return user;
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
