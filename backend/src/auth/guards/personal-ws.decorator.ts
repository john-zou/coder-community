import {UseGuards} from '@nestjs/common';
import {UserWsAuthGuard} from './user-ws.guard';

export function PersonalWs(): MethodDecorator & ClassDecorator {
    return UseGuards(UserWsAuthGuard);
}