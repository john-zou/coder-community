import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user.userID;
});
