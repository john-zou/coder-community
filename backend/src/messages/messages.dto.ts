export class MessageDto {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export class CreateMessageBodyDto {
  userID: string;
  conversationID: string;
  text: string;
  createdAt: number;
}

export class CreateMessageSuccessDto {
  _id: string;
  author: string;
  text: string;
  createdAt: string | number;
  updatedAt: string;
}