import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Client } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CoderCommunityJwtPayload } from '../jwt.strategy';

export type AuthorizedWsResponse = {
  event: string;
  _id: string;
  data?: any;
}

@Injectable() // Singleton by default
export class UserWsAuthGuard implements CanActivate {

  private readonly clientIDToVerifiedUserObjectID: Record<string, string> = {}

  constructor(private readonly jwtService: JwtService) {}

  private decodeJwtForWsClient(socketClientID, jwt) {
    const payload = this.jwtService.decode(jwt) as unknown as CoderCommunityJwtPayload;
    if (payload?._id) {
      this.clientIDToVerifiedUserObjectID[socketClientID] = payload._id;
      return true;
    } else {
      return false;
    }
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const wsContext = context.switchToWs();
    const clientID = wsContext.getClient<Client>().id;
    const data = wsContext.getData<AuthorizedWsResponse>();
    if (data.event === "authenticate") {
      return this.decodeJwtForWsClient(clientID, data.data.jwt);
    }
    else {
      const userObjectID = this.clientIDToVerifiedUserObjectID[clientID];
      if (userObjectID){
        data._id = userObjectID;
        return true;
      } else {
        return false;
      }
    }
  }
}