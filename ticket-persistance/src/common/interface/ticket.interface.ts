import { TicketStatus } from '../../enum/ticket.status.enum';

export interface ITicket {
  title: string;
  description: string;
  status: TicketStatus;
  point: number;
  user_id: string;
  date: string;
}
