import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ITicket } from '../../common/interface/ticket.interface';
import { TicketStatus } from '../../enum/ticket.status.enum';

export class CreateTicketDto implements ITicket {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsNotEmpty()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
