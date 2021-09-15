import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ example: 'Suliko', description: 'User name' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 40, { message: 'Password should be 4-40 length' })
  readonly name: string;
}
