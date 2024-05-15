import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { IUserSchema } from '../common/interface/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern('create-user')
  async create(@Payload() payload: IUserSchema) {
    return await this.userService.create(payload);
  }

  @MessagePattern('get-user-list')
  async getUserList() {
    return this.userService.getList();
  }

  @MessagePattern('get-user')
  async getUser(@Payload() _id: string) {
    return this.userService.getUser(_id);
  }
  @MessagePattern('get-user-ticket')
  async getUserTicket(@Payload() _id: string) {
    console.log(_id);
    return this.userService.getUserTicket(_id);
  }

  @MessagePattern('delete-user')
  async delete(@Payload() userId: string) {
    return this.userService.delete(userId);
  }

  @MessagePattern('update-user')
  async update(@Payload() payload: any) {
    return this.userService.update(payload);
  }
}
