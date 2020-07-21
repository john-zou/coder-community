import {
  createParamDecorator,
  ExecutionContext, Logger,
  NotImplementedException,
} from '@nestjs/common';

/**
 * The MongoDB _id (ObjectID) for the User, globally unique and unchangeable
 */
export const UserObjectID = createParamDecorator((_, ctx: ExecutionContext) => {

  const type = ctx.getType();
  if (type === 'http') {
    return ctx.switchToHttp().getRequest().user._id;
  } else if (type === 'ws') {
    const userObjectID = ctx.switchToWs().getData()?.userObjectID;
    if (!userObjectID) {
      Logger.log('userObjectID is missing -- did not get set by @PersonalWs()', '@UserObjectID param decorator');
    }
    return userObjectID;
  } else {
    throw new NotImplementedException("UserObjectID decorator only supports REST and WebSocket");
  }
});
