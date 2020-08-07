import {CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Client} from 'socket.io';
import {JwtService} from '@nestjs/jwt';
import {CoderCommunityJwtPayload} from '../jwt.strategy';

@Injectable()
export class UserWsAuthGuard implements CanActivate {
    private static readonly clientIDToVerifiedUserObjectID: Record<string, string> = {}
    private logger = new Logger('UserWsAuthGuard');

    constructor(private readonly jwtService: JwtService) {
        this.logger.log('constructor');
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const wsContext = context.switchToWs();
        const clientID = wsContext.getClient<Client>().id;
        this.logger.log(`canActivate -- clientID ${clientID}`);
        const data = wsContext.getData();

        if (data.jwt) {
            // Client is providing JWT
            return this.decodeJwtForWsClient(clientID, data);
        } else {
            const userObjectID = UserWsAuthGuard.clientIDToVerifiedUserObjectID[clientID];
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

    private decodeJwtForWsClient(socketClientID, data) {
        const payload = this.jwtService.decode(data.jwt) as unknown as CoderCommunityJwtPayload;
        // Store the user's ObjectID from the JWT
        let passed = false;
        if (payload?._id) {
            this.logger.log(`Client JWT decoded. User ObjectID: ${payload._id}`);
            data.userObjectID = payload._id;
            UserWsAuthGuard.clientIDToVerifiedUserObjectID[socketClientID] = payload._id;
            passed = true;
        }

        this.logger.log(`Client JWT ${passed ? "passed" : "failed"} verification.`);
        return passed;
    }
}