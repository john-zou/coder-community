import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthGuard } from '@nestjs/passport';



@WebSocketGateway({namespace: 'ws/entity-query'})
export class EntityQueryGateway {

  @SubscribeMessage('get')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
