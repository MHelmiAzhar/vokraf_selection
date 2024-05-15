import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common/interface/user.interface';

export class UpdateUserDto implements IUser {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  file: Buffer;
}
