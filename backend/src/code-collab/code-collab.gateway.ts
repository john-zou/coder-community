import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'ws/code-collab' })
export class CodeCollabGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('CodeCollabGateway');

  @WebSocketServer() wss: Server;

  handleConnection(client: any, ...args): any {
    this.logger.log("Connected.");
  }

  handleDisconnect(client: any): any {
    this.logger.log("Disconnected.");
  }

  afterInit(server: any): any {
    this.logger.log("Initialized.");
  }

  @SubscribeMessage('code')
  handleMessage(client: any, payload: string): void {
    this.wss.emit('code', payload);
  }
}
