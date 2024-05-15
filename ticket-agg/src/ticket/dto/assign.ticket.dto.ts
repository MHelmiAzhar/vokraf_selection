import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssignUserDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
