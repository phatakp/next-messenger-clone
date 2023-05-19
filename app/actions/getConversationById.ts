import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

const getConversationById = async (conversationId: string) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) return null;

        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { users: true },
        });
        return conversation;
    } catch (error) {
        console.log(error);

        return null;
    }
};

export default getConversationById;
