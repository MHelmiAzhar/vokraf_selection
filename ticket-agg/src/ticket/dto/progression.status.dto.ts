import { IsEnum, IsNotEmpty } from 'class-validator';
import { TicketStatus } from '../../enum/ticket.status.enum';

export class ProgressionStatusDto {
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
