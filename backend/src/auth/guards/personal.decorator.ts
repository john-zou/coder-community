import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from './user.guard';

/**
 * Shorthand for UseGuards(UserAuthGuard), used for endpoints that require authentication,
 * i.e. endpoints related to personal things
 * 
 * Place this decorator on top of a controller method, and it will act as authentication
 * middleware.
 * 
 * Also, the @UserID param decorator will be usable in the methods for easy
 * access to the user's identity.
 */
export function Personal(): MethodDecorator & ClassDecorator {
  return UseGuards(UserAuthGuard);
}
