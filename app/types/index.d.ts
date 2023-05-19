import { Conversation, Message, User } from "@prisma/client";

interface IFullMessage extends Message {
    sender: User | null;
    seen: User[];
}

interface IFullConversation extends Conversation {
    users: User[];
    messages?: IFullMessage[];
}
