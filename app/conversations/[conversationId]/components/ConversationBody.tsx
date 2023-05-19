"use client";

import { MessageBox } from "@/app/conversations/[conversationId]/components/MessageBox";
import useConversation from "@/app/hooks/useConversation";
import { IFullMessage } from "@/app/types";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";

interface IConversationBodyProps {
    initialMessages: IFullMessage[];
}

export const ConversationBody: FC<IConversationBodyProps> = ({
    initialMessages,
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    key={message.id}
                    isLast={i === messages.length - 1}
                    message={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    );
};
