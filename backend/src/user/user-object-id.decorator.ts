import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * The MongoDB _id (ObjectID) for the User, globally unique and unchangeable
 */
export const UserObjectID = createParamDecorator((_, ctx: ExecutionContext) => {
  // return ctx.switchToHttp().getRequest().body.user._id;
  return ctx.switchToHttp().getRequest().user._id;
  /*
  const a = ctx.switchToHttp().getRequest().body;
  console.log(a);
  return a.user._id;
   */
});
