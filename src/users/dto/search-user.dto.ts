import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'User email', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  readonly email?: string;

  @ApiProperty({ example: '89995557788', description: 'User phones', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  readonly phone?: string;

  @ApiProperty({ example: 'Suliko', description: 'User name', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  readonly name?: string;

  @ApiProperty({ example: '1', description: 'User phones', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Should be a number' })
  readonly offset?: number;

  @ApiProperty({ example: '10', description: 'User name', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Should be a number' })
  readonly limit?: number;
}
