import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as schemaObject } from 'mongoose';
import { ITicket } from '../../common/interface/ticket.interface';
import { TicketStatus } from '../../enum/ticket.status.enum';

@Schema({
  collection: 'ticket',
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Ticket extends Document implements ITicket {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ default: TicketStatus.Todo, enum: TicketStatus })
  status: TicketStatus;
  @Prop()
  point: number;
  @Prop({ default: '' })
  user_id: string;
  @Prop()
  date: string;
}

export type TicketDocument = HydratedDocument<Ticket>;

export const TicketSchema = SchemaFactory.createForClass(Ticket);
