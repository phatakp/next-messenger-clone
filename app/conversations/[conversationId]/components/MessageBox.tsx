"use client";

import { Avatar } from "@/app/components/Avatar";
import { ImageModal } from "@/app/conversations/[conversationId]/components/ImageModal";
import { IFullMessage } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";

interface IMessageBoxProps {
    isLast: boolean;
    message: IFullMessage;
}

export const MessageBox: FC<IMessageBoxProps> = ({ isLast, message }) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwnMessage = session?.data?.user?.email === message?.sender?.email;

    const seenList = (message.seen || [])
        .filter((user) => user.email !== message.sender?.email)
        .map((user) => user.name)
        .join(", ");

    const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
    const avatar = clsx(isOwnMessage && "order-2");
    const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
    const messageBox = clsx(
        "text-sm w-fit overflow-hidden",
        isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
        message?.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={message?.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {message?.sender?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(message?.createdAt), "p")}
                    </div>
                </div>
                <div className={messageBox}>
                    <ImageModal
                        src={message.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {message?.image ? (
                        <Image
                            alt="image"
                            src={message.image}
                            height={288}
                            width={288}
                            className="object-cover transition cursor-pointer hover:scale-110 translate"
                            onClick={() => setImageModalOpen(true)}
                        />
                    ) : (
                        <div className="text-gray-800">{message.body}</div>
                    )}
                </div>
                {isLast && isOwnMessage && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-600">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
};
