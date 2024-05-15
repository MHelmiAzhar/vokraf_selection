import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { UserRepository } from './user.repository';

import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(payload) {
    const isEmailExist = await this.userModel.findOne({ email: payload.email });
    if (isEmailExist)
      throw new RpcException(
        new BadRequestException('User Already Exist').getResponse(),
      );

    return await this.userModel.create({
      name: payload.name,
      email: payload.email,
      profile_pic_url: payload.imagePath,
    });
  }

  async getList() {
    const res = await this.userModel.find();
    return res;
  }

  async getUser(_id: string) {
    const res = await this.userModel.findOne({ _id });
    if (!res)
      throw new RpcException(
        new NotFoundException('User Not Found').getResponse(),
      );
    return res;
  }
  async getUserTicket(_id: string) {
    const res = await this.userModel.findOne({ _id });

    return res;
  }
  async delete(_id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(_id);
    if (!deleteUser)
      throw new RpcException(
        new NotFoundException('User Not Found').getResponse(),
      );

    return deleteUser;
  }

  async update(payload: any) {
    const { userId, updateUserDto } = payload;
    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );
    if (!updateUser)
      throw new RpcException(
        new NotFoundException('User Not Found').getResponse(),
      );

    return updateUser;
  }
}
