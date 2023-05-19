"use client";
import { ConversationBox } from "@/app/conversations/components/ConversationBox";
import useConversation from "@/app/hooks/useConversation";
import { IFullConversation } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

interface IConversationListProps {
    initialItems: IFullConversation[];
}

export const ConversationList: FC<IConversationListProps> = ({
    initialItems,
}) => {
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    return (
        <aside
            className={clsx(
                "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
                isOpen ? "hidden" : "block w-full left-0"
            )}
        >
            <div className="px-5">
                <div className="flex justify-between pt-4 mb-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>
                    <div className="p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75">
                        <MdOutlineGroupAdd />
                    </div>
                </div>

                {items.map((item) => (
                    <ConversationBox
                        key={item.id}
                        item={item}
                        selected={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>
    );
};
