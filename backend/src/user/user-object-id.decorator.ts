import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { AuthorizedWsResponse } from '../auth/guards/user-ws.guard';

/**
 * The MongoDB _id (ObjectID) for the User, globally unique and unchangeable
 */
export const UserObjectID = createParamDecorator((_, ctx: ExecutionContext) => {

  const type = ctx.getType();
  if (type === 'http') {
    return ctx.switchToHttp().getRequest().user._id;
  } else if (type === 'ws') {
    return ctx.switchToWs().getData<AuthorizedWsResponse>()._id;
  } else {
    throw new NotImplementedException("UserObjectID decorator only supports REST and WebSocket");
  }
});
