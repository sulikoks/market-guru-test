import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchUserDto } from "./dto/search-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getByValue(@Param('id') userId: number) {
    return this.userService.getUserById(userId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post('/all')
  getAll(@Body() searchUsers: SearchUserDto) {
    return this.userService.getAllUsers(searchUsers);
  }
}
