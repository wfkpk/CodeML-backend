import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  AdminAuthGuard,
  FirebaseAuthGuard,
} from 'src/firebase/firebase-auth.guard';
import { UserAuthGuard } from 'src/guard/auth.guard';
import { Response } from 'src/interface/response';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(FirebaseAuthGuard, UserAuthGuard, AdminAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new problem' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiCreatedResponse({
    description: 'The problem has been successfully created.',
    type: CreateQuestionDto,
  })
  async create(@Body() createProblemDto: CreateQuestionDto): Promise<Response> {
    return {
      data: await this.questionService.createQuestion(createProblemDto),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a problem by ID' })
  @ApiParam({ name: 'id', description: 'ID of the problem to retrieve' })
  async findOne(@Param('id') id: string): Promise<Response> {
    return {
      data: await this.questionService.getQuestionById(+id),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all problems' })
  async findAll(): Promise<Response> {
    return {
      data: await this.questionService.getAllQuestions(),
    };
  }
}
