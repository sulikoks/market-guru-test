import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from "../users/dto/login-user.dto";
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    if (!userDto.email && !userDto.phone) {
      throw new HttpException('Email or Phone is required', HttpStatus.BAD_REQUEST);
    }
    const candidateByEmail = userDto.email && await this.userService.getUserByEmail(userDto.email);
    const candidateByPhone = userDto.phone && await this.userService.getUserByPhone(userDto.phone);
    if (candidateByEmail) {
      throw new HttpException('This email is busy', HttpStatus.BAD_REQUEST);
    }
    if (candidateByPhone) {
      throw new HttpException('This phone is busy', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, phone: user.phone, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    if (userDto.email) {
      return this.loginByEmail(userDto)
    } else if (userDto.phone) {
      return this.loginByPhone(userDto)
    }
    throw new UnauthorizedException('Email or Phone is required');
  }

  private async loginByPhone(userDto: LoginUserDto) {
    const user = await this.userService.getUserByPhone(userDto.phone);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) return user;
    throw new UnauthorizedException('Phone or password is not correct');
  }

  private async loginByEmail(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) return user;
    throw new UnauthorizedException('Email or password is not correct');
  }
}
