export class CreateDiscussionDto {
  content: string;
}

export class CreateDiscussionSuccessDto {
  _id: string;
}

export class DiscussionDto {
  author: string;
  content: string;
}