import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ITicket } from '../common/interface/ticket.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @MessagePattern('create-ticket')
  async create(@Payload() payload: ITicket) {
    return await this.ticketService.create(payload);
  }

  @MessagePattern('get-ticket-list')
  async getTicketList() {
    return this.ticketService.getList();
  }

  @MessagePattern('get-ticket')
  async getTicket(@Payload() _id: string) {
    return this.ticketService.getTicket(_id);
  }

  @MessagePattern('delete-ticket')
  async delete(@Payload() _id: string) {
    return this.ticketService.delete(_id);
  }

  @MessagePattern('update-ticket')
  async update(@Payload() payload: any) {
    return this.ticketService.update(payload);
  }
  @MessagePattern('assign-user-ticket')
  async assignUser(@Payload() payload: any) {
    return this.ticketService.assignUser(payload);
  }
  @MessagePattern('update-status-ticket')
  async updateStatus(@Payload() payload: any) {
    return this.ticketService.updateStatus(payload);
  }
  @MessagePattern('get-summary-task')
  async getSummary(@Payload() user_id: string) {
    return this.ticketService.getSummary(user_id);
  }
  @MessagePattern('get-biweekly-performance')
  async getBiWeeklyPerformance(@Payload() user_id: string) {
    return this.ticketService.getBiWeeklyPerformance(user_id);
  }
}
