import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    console.log('FirebaseAuthGuard');
    return super.canActivate(context);
  }
}

@Injectable()
export class UserAuthGuard {
  constructor(
    private readonly firebaseAuth: FirebaseAuthStrategy,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const firebaseUser = request.user;

    if (!firebaseUser) {
      return false;
    }
    const firebaseUid: string = firebaseUser.uid;
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    if (!user) {
      return false;
    }

    request.headers['userId'] = user.id;

    return true;
  }
}

@Injectable()
export class NotAuthGuard {
  canActivate(): boolean {
    return true;
  }
}

@Injectable()
export class AdminAuthGuard {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['userId'];

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.admin) {
      return true;
    }
    return false;
  }
}
