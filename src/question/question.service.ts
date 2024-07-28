import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(questionData: CreateQuestionDto) {
    return this.prisma.problem.create({
      data: {
        title: questionData.title,
        description: questionData.description,
        inputFormat: questionData.inputFormat,
        outputFormat: questionData.outputFormat,
        constraints: questionData.constraints,
        sampleCode: questionData.sampleCode,
        sampleInput: questionData.sampleInput,
        sampleOutput: questionData.sampleOutput,
        explanation: questionData.explanation,
        difficulty: questionData.difficulty,
        defaultCode: questionData.defaultCode,
        timeLimit: questionData.timeLimit,
        memoryLimit: questionData.memoryLimit,
      },
    });
  }

  async getQuestionById(qId: number) {
    return this.prisma.problem.findUnique({
      where: { qID: qId },
    });
  }

  async getAllQuestions() {
    return this.prisma.problem.findMany();
  }
}
