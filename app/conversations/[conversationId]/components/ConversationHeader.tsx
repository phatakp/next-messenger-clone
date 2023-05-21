"use client";

import { Avatar } from "@/app/components/Avatar";
import { AvatarGroup } from "@/app/components/AvatarGroup";
import { ProfileDrawer } from "@/app/components/ProfileDrawer";
import useOtherUser from "@/app/hooks/useOtherUser";
import { IFullConversation } from "@/app/types";
import Link from "next/link";
import { FC, Fragment, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface IConversationHeaderProps {
    conversation: IFullConversation;
}

export const ConversationHeader: FC<IConversationHeaderProps> = ({
    conversation,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(() => {
        if (conversation.isGroup) return `${conversation.users.length} members`;
        return "Active";
    }, [conversation]);

    return (
        <Fragment>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-b shadow-sm sm:px-4 lg:px-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/conversations"
                        className="block transition cursor-pointer lg:hidden text-sky-500 hover:text-sky-600"
                    >
                        <HiChevronLeft size={32} />
                    </Link>
                    {conversation?.isGroup ? (
                        <AvatarGroup users={conversation?.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}

                    <div className="flex flex-col">
                        <div className="text-black">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="transition cursor-pointer text-sky-500 hover:text-sky-600"
                />
            </div>
        </Fragment>
    );
};
