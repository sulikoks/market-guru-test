import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import {SearchUserDto} from "./dto/search-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto) {
    if (!dto.email && !dto.phone) return;
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findByPk(userId);
    return user;
  }

  async getAllUsers(searchUser: SearchUserDto) {
    const where = {};
    Object.entries(searchUser).forEach(([key, val]) => {
      if (['offset', 'limit'].includes(key)) return;
      where[key] = { [Op.like]: `%${val}%` };
    });
    const users = await this.userRepository.findAll({
      where,
      offset: searchUser.offset,
      limit: searchUser.limit
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
    });
    return user;
  }
}
