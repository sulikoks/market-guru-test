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

  createUser(dto: CreateUserDto): Promise<User> {
    if (!dto.email && !dto.phone) return;
    return this.userRepository.create(dto);
  }

  getUserById(userId: number): Promise<User> {
    return this.userRepository.findByPk(userId);
  }

  async updateUserById(userId: number, dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    user.phone = dto.phone;
    user.email = dto.email;
    user.name = dto.name;
    return user.save();
  }

  deleteUserById(id: number): Promise<number> {
    return this.userRepository.destroy({
      where: { id },
    });
  }

  getAllUsers(searchUser: SearchUserDto): Promise<User[]> {
    const where = {};
    Object.entries(searchUser).forEach(([key, val]) => {
      if (['offset', 'limit'].includes(key)) return;
      where[key] = { [Op.like]: `%${val}%` };
    });
    return this.userRepository.findAll({
      where,
      offset: searchUser.offset,
      limit: searchUser.limit,
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  getUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
    });
  }
}
