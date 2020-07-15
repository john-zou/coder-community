export class MessageDto {
  _id: string;
  author: string;
  text: string;
<<<<<<< HEAD
=======
  attachments: string[];
>>>>>>> master
  createdAt: string;
  updatedAt: string;
}

export class CreateMessageBodyDto {
<<<<<<< HEAD
  userID: string;
=======
  userID: string
>>>>>>> master
  conversationID: string;
  text: string;
  createdAt: number;
}

<<<<<<< HEAD

=======
>>>>>>> master
export class CreateMessageSuccessDto {
  _id: string;
  author: string;
  text: string;
  createdAt: string | number;
  updatedAt: string;
}