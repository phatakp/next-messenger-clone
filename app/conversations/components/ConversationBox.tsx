import { Avatar } from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { IFullConversation } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

interface IConversationBoxProps {
    item: IFullConversation;
    selected?: boolean;
}

export const ConversationBox: FC<IConversationBoxProps> = ({
    item,
    selected,
}) => {
    const otherUser = useOtherUser(item);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${item.id}`);
    }, [item.id, router]);

    const lastMessage = useMemo(() => {
        const messages = item.messages || [];
        return messages[messages.length - 1];
    }, [item.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArray = lastMessage.seen || [];

        if (!userEmail) return false;

        return (
            seenArray.filter((user) => user.email === userEmail).length !== 0
        );
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return "Sent an Image";
        if (lastMessage?.body) return lastMessage.body;
        return "Started a conversation";
    }, [lastMessage]);

    return (
        <div
            className={clsx(
                "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
                selected ? "bg-neutral-100" : "bg-white"
            )}
            onClick={handleClick}
        >
            <Avatar user={otherUser} />
            <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                    <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 text-md">
                            {item.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs font-light text-gray-400">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>

                    <p
                        className={clsx(
                            "truncate text-sm",
                            hasSeen ? "text-gray-500" : "text-black font-medium"
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};
