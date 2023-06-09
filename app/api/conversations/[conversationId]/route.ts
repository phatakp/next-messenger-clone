import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id)
            return new NextResponse("Unauthorized", { status: 401 });

        const existingConversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { users: true },
        });

        if (!existingConversation)
            return new NextResponse("Invalid Conversation Id", { status: 400 });

        const deleteConversation = await prisma.conversation.deleteMany({
            where: { id: conversationId, userIds: { hasSome: currentUser.id } },
        });

        return NextResponse.json(deleteConversation);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
