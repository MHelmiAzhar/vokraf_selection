import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../../common/interface/user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
