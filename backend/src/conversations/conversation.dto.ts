export class CreateConversationBodyDto {
    userID: string;
    name?: string;
    users: string[];
    message?: string; //initial message --may or may not exists
    createdAt: number;
}

export class CreateConversationSuccessDto {
    _id: string;
    name?: string;
    users: string[];
    messages: string[];
    createdAt: string | number;
}