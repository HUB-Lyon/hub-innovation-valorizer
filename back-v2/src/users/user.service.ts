import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { HIVUser } from './schema/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<Array<HIVUser>> {
    return await this.userModel.find().exec();
  }
}
