import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchUserDto } from "./dto/search-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getById(@Param('id') userId: string) {
    return this.userService.getUserById(+userId);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(@Param('id') userId: string, @Body() createUserDto: CreateUserDto) {
    return this.userService.updateUserById(+userId, createUserDto);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') userId: string) {
    return this.userService.deleteUserById(+userId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post('/all')
  getAll(@Body() searchUserDto: SearchUserDto) {
    return this.userService.getAllUsers(searchUserDto);
  }
}
