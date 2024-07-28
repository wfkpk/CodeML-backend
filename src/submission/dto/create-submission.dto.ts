import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  langId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  uId: string;
}
