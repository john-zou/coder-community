import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import { Response } from "express"
import * as path from 'path';

@Catch(NotFoundException)
export class GlobalRedirectForReact implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (process.env.LOCAL) {
      response.sendStatus(404);
      return;
    }
    response.sendFile(path.resolve('./build/index.html'));
  }
}