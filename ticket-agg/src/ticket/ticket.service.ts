import { Inject, Injectable } from '@nestjs/common';
import { TICKET_QUEUE } from '../common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTicketDto } from './dto/create.ticket';
import { UpdateTicketDto } from './dto/update.ticket.dto';
import { AssignUserDto } from './dto/assign.ticket.dto';
import { ProgressionStatusDto } from './dto/progression.status.dto';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_QUEUE) private readonly clientTicket: ClientProxy,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = await firstValueFrom(
      this.clientTicket.send('create-ticket', createTicketDto),
    );

    return ticket;
  }

  async findAll() {
    const getListTicket = await firstValueFrom(
      this.clientTicket.send('get-ticket-list', {}),
    );
    return getListTicket;
  }

  async findOne(_id: string) {
    const getTicket = await firstValueFrom(
      this.clientTicket.send('get-ticket', _id),
    );
    return getTicket;
  }

  async update(_id: string, updateTicketDto: UpdateTicketDto) {
    let payload: any = {
      _id,
      updateTicketDto,
    };
    const updateTicket = await firstValueFrom(
      this.clientTicket.send('update-ticket', payload),
    );
    return updateTicket;
  }

  async assignUser(_id: string, user_id: AssignUserDto) {
    let payload: any = {
      _id,
      ...user_id,
    };

    const updateTicket = await firstValueFrom(
      this.clientTicket.send('assign-user-ticket', payload),
    );
    return updateTicket;
  }
  async updateProgressionStatus(_id: string, status: ProgressionStatusDto) {
    let payload: any = {
      _id,
      ...status,
    };

    const updateTicket = await firstValueFrom(
      this.clientTicket.send('update-status-ticket', payload),
    );
    return updateTicket;
  }

  async remove(_id: string) {
    const deleteTicket = await firstValueFrom(
      this.clientTicket.send('delete-ticket', _id),
    );
    return deleteTicket;
  }
}
