import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  /**
   * @param userID GitHub login
   * @returns whether the user had to be newly created
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  createOrUpdateUser(userID: string): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }
}
