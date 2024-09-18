import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly authModel: Model<User>,
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register({
    firstName,
    lastName,
    age,
    username,
    password,
  }: RegisterDto) {
    await this.userService.findByUsername(username);

    const hashedPass = await hash(password, 12);

    const registeredUser = await this.authModel.create({
      firstName,
      lastName,
      age,
      username,
      password: hashedPass,
    });

    const token = this.jwt.sign({ id: registeredUser._id.toString() });
    return {
      message: 'User successfully registered',
      data: registeredUser,
      token,
    };
  }

  async login({ username, password }: LoginDto) {
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const token = this.jwt.sign({ id: user._id.toString() });

    return { message: 'User successfully logged in', data: user, token };
  }
}
