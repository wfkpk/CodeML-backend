import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export class CreateQuestionDto {
  @ApiProperty({ description: 'Title of the problem' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the problem' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Input format for the problem' })
  @IsString()
  @IsNotEmpty()
  inputFormat: string;

  @ApiProperty({ description: 'Output format for the problem' })
  @IsString()
  @IsNotEmpty()
  outputFormat: string;

  @ApiProperty({ description: 'Constraints of the problem' })
  @IsString()
  @IsNotEmpty()
  constraints: string;

  @ApiProperty({ description: 'Sample input for the problem' })
  @IsString()
  @IsNotEmpty()
  sampleInput: string;

  @ApiProperty({ description: 'Sample output for the problem' })
  @IsString()
  @IsNotEmpty()
  sampleOutput: string;

  @ApiProperty({ description: 'Explanation of the sample output' })
  @IsString()
  @IsNotEmpty()
  explanation: string;

  @ApiProperty({
    description: 'Difficulty level of the problem',
    enum: Difficulty,
  })
  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty;

  @ApiProperty({ description: 'Default code provided for the problem' })
  @IsString()
  @IsNotEmpty()
  defaultCode: string;

  @ApiProperty({ description: 'Time limit for the problem in seconds' })
  @IsNumber()
  @IsNotEmpty()
  timeLimit: number;

  @ApiProperty({ description: 'Memory limit for the problem in megabytes' })
  @IsNumber()
  @IsNotEmpty()
  memoryLimit: number;

  @ApiPropertyOptional({ description: 'Date when the problem was created' })
  @IsOptional()
  @IsString()
  createdAt: string;

  @ApiPropertyOptional({
    description: 'Date when the problem was last updated',
  })
  @IsOptional()
  @IsString()
  updatedAt: string;

  @ApiPropertyOptional({ description: 'sample code ' })
  @IsOptional()
  @IsString()
  sampleCode: string;
}
