export class ConversationDto {
    _id: string;
    users: string[];
    messages: string[];
    name: string;
    createdAt: number;
    updatedAt?: number;
}

export class NewConversationServerToClientDto {
    /**
     * Whether this client created this new conversation
     *
     * If so, the client should unset "pending" status and switch to the newly
     * created conversation. If not, the client should add it to Redux and
     * generate a notification of some sort, but should not switch to it automatically.
     */
    isCreator: boolean;

    /**
     * The newly created conversation
     */
    conversation: ConversationDto;
}

export class NewConversationClientToServerDto {
    otherUsers: string[];
    initialMessage?: string;
    name?: string;
}