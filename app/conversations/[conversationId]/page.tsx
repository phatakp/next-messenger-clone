import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import { ConversationBody } from "@/app/conversations/[conversationId]/components/ConversationBody";
import { ConversationForm } from "@/app/conversations/[conversationId]/components/ConversationForm";
import { ConversationHeader } from "@/app/conversations/[conversationId]/components/ConversationHeader";

interface IConversationDetailParams {
    conversationId: string;
}

const ConversationDetail = async ({
    params,
}: {
    params: IConversationDetailParams;
}) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="h-full lg:pl-80">
                <div className="flex flex-col h-full">
                    <EmptyState />
                </div>
            </div>
        );
    }
    return (
        <div className="h-full lg:pl-80">
            <div className="flex flex-col h-full">
                <ConversationHeader conversation={conversation} />
                <ConversationBody initialMessages={messages} />
                <ConversationForm />
            </div>
        </div>
    );
};

export default ConversationDetail;
