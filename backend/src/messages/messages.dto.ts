export class MessageDto {
  _id: string;
  author: string;
  text: string;
  createdAt: string | number;
  updatedAt: string | number;
}

export class CreateMessageBodyDto {
  userID: string;
  conversationID: string;
  text: string;
  createdAt: number;
}

export class CreateMessageSuccessDto {
  conversationID: string;
  _id: string;
  author: string;
  text: string;
  createdAt: number;
  updatedAt?: number;
}