"use client";
import EmptyState from "@/app/components/EmptyState";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { FC } from "react";

interface IConversationPageProps {}

const ConversationPage: FC<IConversationPageProps> = (props) => {
    const { isOpen } = useConversation();
    return (
        <div
            className={clsx(
                "lg:pl-80 h-full lg:block",
                isOpen ? "block" : "hidden"
            )}
        >
            <EmptyState />
        </div>
    );
};

export default ConversationPage;
