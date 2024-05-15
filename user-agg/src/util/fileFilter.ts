import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (
  req: Request,
  file: any,
  callback: (error: any, valid: boolean) => void,
) => {
  if (!file.originalname || !file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new BadRequestException(`File Must be of type jpg|jpeg|png`),
      false,
    );
  }
  callback(null, true);
};
