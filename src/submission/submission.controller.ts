import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubmissionService } from './submission.service';
import { Response } from 'src/interface/response';
@ApiTags('submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get('test')
  @ApiOperation({
    summary: 'Test the submission service',
    description:
      'A test endpoint to check if the submission service is working correctly.',
  })
  async testSubmission(): Promise<Response> {
    return {
      data: this.submissionService.fun(),
    };
  }

  // @Post('submit')
  // @ApiOperation({
  //   summary: 'Submit a solution',
  //   description:
  //     'Submit a solution for evaluation. The solution is processed by the submission service.',
  // })
  // @ApiBody({
  //   type: CreateSubmissionDto,
  //   description: 'The data required to submit a solution.',
  // })
  // async submitSolution(
  //   @Body() submissionDto: CreateSubmissionDto,
  // ): Promise<Response> {
  //   return {
  //     data: this.submissionService.submitSolution(submissionDto),
  //   };
  // }
}
