import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsOptional, IsPhoneNumber, IsString, Length} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'User email', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a email' })
  readonly email?: string;

  @ApiProperty({ example: '89995557788', description: 'User phones', required: false })
  @IsOptional()
  @IsPhoneNumber('RU', { message: 'Should be a phone number' })
  readonly phone?: string;

  @ApiProperty({
    example: 'asd123',
    description: 'User password',
    minLength: 6,
    maxLength: 16,
  })
  @IsString({ message: 'Should be a string' })
  @Length(6, 16, { message: 'Password should be 6-16 length' })
  readonly password: string;
}
