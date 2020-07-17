import { CanActivate, ExecutionContext, Global, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Client } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CoderCommunityJwtPayload } from '../jwt.strategy';

@Injectable() // Singleton by default
export class UserWsAuthGuard implements CanActivate {
  private logger = new Logger('UserWsAuthGuard');
  private readonly clientIDToVerifiedUserObjectID: Record<string, string> = {}

  constructor(private readonly jwtService: JwtService) {}

  private decodeJwtForWsClient(socketClientID, jwt) {
    const payload = this.jwtService.decode(jwt) as unknown as CoderCommunityJwtPayload;
    // Store the user's ObjectID from the JWT
    let passed = false;
    if (payload?._id) {
      this.logger.log(`Client JWT decoded. User ObjectID: ${payload._id}`);
      this.clientIDToVerifiedUserObjectID[socketClientID] = payload._id;
      passed = true;
    }

    this.logger.log(`Client JWT ${passed ? "passed": "failed"} verification.`);
    return passed;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const wsContext = context.switchToWs();
    const clientID = wsContext.getClient<Client>().id;
    const data = wsContext.getData();

    if (data.jwt) {
      // Client is providing JWT
      return this.decodeJwtForWsClient(clientID, data.jwt);
    } else {
      const userObjectID = this.clientIDToVerifiedUserObjectID[clientID];
      if (!userObjectID) {
        this.logger.log(`Rejecting client because client is not authenticated and did not attach JWT.`);
        return false;
      }
      // Client is not providing JWT, so we add to data the userID field
      if (data && typeof data === "object") {
        this.logger.log(`Setting data.userObjectID = ${userObjectID}`);
        data.userObjectID = userObjectID;
      } else {
        // we cannot attach userID
        this.logger.log(`Cannot set data.userObjectID as data is not an object.`);
      }

      return true;
    }
  }
}