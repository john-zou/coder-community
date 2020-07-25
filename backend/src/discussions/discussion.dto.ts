export class CreateDiscussionDto {
  question: string;
  title: string;
  content: string;
}

export class CreateDiscussionSuccessDto {
  _id: string;
}

export class DiscussionDto {
  _id: string;
  author: string;
  question: string;
  title: string;
  content: string;
}

export class GetDiscussionsDto {
  discussions: DiscussionDto[];
}