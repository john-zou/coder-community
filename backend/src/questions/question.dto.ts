export class QuestionDto {
    _id: string;
    title: string;
    content: string;
    solution: string;
}

export class GetQuestionsSuccessDto {
    questions: QuestionDto[]
}