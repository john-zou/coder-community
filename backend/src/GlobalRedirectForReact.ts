import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import * as path from 'path';

@Catch(NotFoundException)
export class GlobalRedirectForReact implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.sendFile(path.resolve('./build/index.html'));
  }
}