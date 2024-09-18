import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create({
    firstName,
    lastName,
    age,
    username,
    password,
  }: CreateUserDto): Promise<User> {
    await this.findByUsername(username);

    const hashedPass = await hash(password, 12);

    const createdUser = new this.userModel({
      firstName,
      lastName,
      age,
      username,
      password: hashedPass,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<void> {
    const findUsername = await this.userModel.findOne({ username });
    if (findUsername) {
      throw new ConflictException(`${username} already exist`);
    }
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
}
