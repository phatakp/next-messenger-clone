"use client";

import { MessageBox } from "@/app/conversations/[conversationId]/components/MessageBox";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { IFullMessage } from "@/app/types";
import axios from "axios";
import { find } from "lodash";
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

    useEffect(() => {
        const messageHandler = (message: IFullMessage) => {
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
                if (find(current, { id: message.id })) return current;
                return [...current, message];
            });
            bottomRef.current?.scrollIntoView();
        };

        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView();

        pusherClient.bind("messages:new", messageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind("messages:new", messageHandler);
        };
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
