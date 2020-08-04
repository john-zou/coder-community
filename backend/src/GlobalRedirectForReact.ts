import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
=======
import { Response } from "express"
>>>>>>> master
import * as path from 'path';

@Catch(NotFoundException)
export class GlobalRedirectForReact implements ExceptionFilter {
<<<<<<< HEAD
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
=======
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (process.env.LOCAL) {
      response.sendStatus(404);
      return;
    }
>>>>>>> master
    response.sendFile(path.resolve('./build/index.html'));
  }
}