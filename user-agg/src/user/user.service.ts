import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TICKET_QUEUE, USER_QUEUE } from '../common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_QUEUE) private readonly clientUser: ClientProxy,
    @Inject(TICKET_QUEUE) private readonly clientTicket: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto, image) {
    const imagePath = image.path;
    const payload = { ...createUserDto, imagePath };
    const user = await firstValueFrom(
      this.clientUser.send('create-user', payload),
    );

    return user;
  }

  async findAll() {
    const getListUser = await firstValueFrom(
      this.clientUser.send('get-user-list', {}),
    );
    return getListUser;
  }
  async getSummary(user_id: string) {
    const getSummary = await firstValueFrom(
      this.clientTicket.send('get-summary-task', user_id),
    );
    if (getSummary.length == 0) throw new NotFoundException('User Not Found');
    return getSummary;
  }
  async getBiWeeklyPerformance(user_id: string) {
    const getBiWeeklyPerformance = await firstValueFrom(
      this.clientTicket.send('get-biweekly-performance', user_id),
    );
    if (getBiWeeklyPerformance.length == 0)
      throw new NotFoundException('User Not Found');
    return getBiWeeklyPerformance;
  }

  async findOne(userId: string) {
    const getUser = await firstValueFrom(
      this.clientUser.send('get-user', userId),
    );
    return getUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto, image) {
    let payload: any = {
      userId,
      updateUserDto,
    };

    if (image) {
      payload.image = image;
    }
    const updateUser = await firstValueFrom(
      this.clientUser.send('update-user', payload),
    );
    return updateUser;
  }

  async remove(userId: string) {
    const deleteUser = await firstValueFrom(
      this.clientUser.send('delete-user', userId),
    );
    return deleteUser;
  }
}
