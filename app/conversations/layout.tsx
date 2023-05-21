import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { ConversationList } from "@/app/conversations/components/ConversationList";
import { FC, ReactNode } from "react";

interface IConversationLayoutProps {
    children: ReactNode;
}

//@ts-expect-error Server Component
const ConversationLayout: FC<IConversationLayoutProps> = async ({
    children,
}) => {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full bg-white">
                <ConversationList users={users} initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
};

export default ConversationLayout;
