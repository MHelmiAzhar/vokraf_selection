import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schema/ticket.schema';
import { Model } from 'mongoose';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_QUEUE } from '../common/constants/service';
import { ITicket } from '../common/interface/ticket.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @Inject(USER_QUEUE) private readonly clientUser: ClientProxy,
  ) {}

  async create(payload: ITicket) {
    if (payload.user_id) {
      const isUserExist = await firstValueFrom(
        this.clientUser.send('get-user-ticket', payload.user_id),
      );
      if (!isUserExist)
        throw new RpcException(
          new NotFoundException(
            'The user you assigned does not exist',
          ).getResponse(),
        );
    }
    return await this.ticketModel.create(payload);
  }

  async getList() {
    const res = await this.ticketModel.find();
    return res;
  }

  async getTicket(_id: string) {
    const res = await this.ticketModel.findOne({ _id });
    if (!res)
      throw new RpcException(
        new NotFoundException('Ticket Not Found').getResponse(),
      );
    return res;
  }
  async delete(_id: string) {
    const deleteTicket = await this.ticketModel.findByIdAndDelete(_id);
    if (!deleteTicket)
      throw new RpcException(
        new NotFoundException('Ticket Not Found').getResponse(),
      );

    return deleteTicket;
  }

  async update(payload: any) {
    const { _id, updateTicketDto } = payload;
    const updateTicket = await this.ticketModel.findByIdAndUpdate(
      { _id: _id },
      updateTicketDto,
      { new: true },
    );
    if (!updateTicket)
      throw new RpcException(
        new NotFoundException('Ticket Not Found').getResponse(),
      );

    return updateTicket;
  }
  async updateStatus(payload: any) {
    console.log(payload);
    const { _id, status } = payload;
    const updateTicket = await this.ticketModel.findByIdAndUpdate(
      { _id },
      { status },
      {
        new: true,
      },
    );
    if (!updateTicket)
      throw new RpcException(
        new NotFoundException('Ticket Not Found').getResponse(),
      );

    return updateTicket;
  }
  async assignUser(payload: any) {
    const _id = payload.user_id;
    const ticket_id = payload._id;

    const isUserExist = await firstValueFrom(
      this.clientUser.send('get-user-ticket', _id),
    );
    if (!isUserExist)
      throw new RpcException(
        new NotFoundException(
          'The user you assigned does not exist',
        ).getResponse(),
      );

    const updateTicket = await this.ticketModel.findByIdAndUpdate(
      { _id: ticket_id },
      { user_id: _id },
      { new: true },
    );
    if (!updateTicket)
      throw new RpcException(
        new NotFoundException('Ticket Not Found').getResponse(),
      );

    return updateTicket;
  }

  async getSummary(user_id: string) {
    const res = await this.ticketModel.find({ user_id: user_id });

    if (res.length === 0) {
      return res;
    }

    const statusCounts = {
      Todo: { tasks: 0, points: 0 },
      'In Progress': { tasks: 0, points: 0 },
      'In Review': { tasks: 0, points: 0 },
      Done: { tasks: 0, points: 0 },
    };

    res.forEach((task) => {
      if (statusCounts[task.status]) {
        statusCounts[task.status].tasks += 1;
        statusCounts[task.status].points += task.point;
      }
    });

    const summary = {
      Todo: {
        tasks: statusCounts['Todo'].tasks,
        points: statusCounts['Todo'].points,
      },
      'In Progress': {
        tasks: statusCounts['In Progress'].tasks,
        points: statusCounts['In Progress'].points,
      },
      'In Review': {
        tasks: statusCounts['In Review'].tasks,
        points: statusCounts['In Review'].points,
      },
      Done: {
        tasks: statusCounts['Done'].tasks,
        points: statusCounts['Done'].points,
      },
    };

    return summary;
  }

  async getBiWeeklyPerformance(user_id: string) {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const formattedToday = formatDate(today);
    const formattedTwoWeeksAgo = formatDate(twoWeeksAgo);

    const res = await this.ticketModel.find({
      user_id: user_id,
      date: {
        $gte: formattedTwoWeeksAgo,
        $lt: formattedToday,
      },
    });

    if (res.length === 0) {
      return res;
    }

    let completedTask = 0;
    let completedPoint = 0;
    let totalTask = 10;
    let totalPoint = 10;

    res.forEach((task) => {
      if (task.status === 'Done') {
        completedTask += 1;
        completedPoint += task.point;
      }
    });

    const unCompletedTask = totalTask - completedTask;
    const unCompletedPoint = totalPoint - completedPoint;

    const summary = {
      completedTask: completedTask,
      unCompletedTask: unCompletedTask,
      totalTask: totalTask,
      completedTaskPercentage:
        ((completedTask / totalTask) * 100).toFixed(2) + '%',
      completedPoint: completedPoint,
      unCompletedPoint: unCompletedPoint,
      totalPoint: totalPoint,
      completedPointPercentage:
        ((completedPoint / totalPoint) * 100).toFixed(2) + '%',
    };

    return summary;
  }
}
