import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create.ticket';
import { UpdateTicketDto } from './dto/update.ticket.dto';
import { Payload } from '@nestjs/microservices';
import { AssignUserDto } from './dto/assign.ticket.dto';
import { ProgressionStatusDto } from './dto/progression.status.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get('list')
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') _id: string,
    @Payload() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(_id, updateTicketDto);
  }

  @Patch('assign/:id')
  assignUser(@Param('id') _id: string, @Payload() user_id: AssignUserDto) {
    return this.ticketService.assignUser(_id, user_id);
  }
  @Patch('status/:id')
  updateProgressionStatus(
    @Param('id') _id: string,
    @Payload() status: ProgressionStatusDto,
  ) {
    return this.ticketService.updateProgressionStatus(_id, status);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
