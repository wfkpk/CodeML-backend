import { UserAuthGuard } from 'src/guard/auth.guard';
import { UserService } from './user.service';
import {
  Controller,
  UseGuards,
  Request,
  Headers,
  Get,
  Post,
} from '@nestjs/common';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Response } from 'src/interface/response';

@Controller('u')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createUser(
    @Headers('Authorization') authHeader: string,
  ): Promise<Response> {
    const authToken = authHeader.replace('Bearer ', '');
    console.log(authToken);
    return {
      data: await this.userService.createUser(authToken),
    };
  }

  @UseGuards(FirebaseAuthGuard, UserAuthGuard)
  @Get()
  async getUserProfile(@Request() request: any): Promise<Response> {
    const userId = request.headers['userId'];
    return {
      data: await this.userService.getUserProfile(userId),
    };
  }
}
