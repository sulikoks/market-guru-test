import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email?: string;
  phone?: string;
  name: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email?: string;

  @ApiProperty({ example: '89995557788', description: 'User phone' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone?: string;

  @ApiProperty({ example: 'Suliko', description: 'User name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'asd123', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
