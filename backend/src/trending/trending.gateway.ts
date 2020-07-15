import { Logger } from "@nestjs/common";
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway() //by default server already serves at 3001
export class TrendingGateway implements OnGatewayConnection {
  @WebSocketServer()
  wss: Server;

  private logger = new Logger('TrendingGateway');

  handleConnection(client: Socket): void {
    this.logger.log('New client connected');
    client.emit('connection', 'suscessfully connected to server');
  }
}