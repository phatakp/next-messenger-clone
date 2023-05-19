import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currentUser?.id)
            return new NextResponse("Unauthorized", { status: 401 });

        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { messages: { include: { seen: true } }, users: true },
        });

        if (!conversation)
            return new NextResponse("Invalid ID", { status: 400 });

        //Find last message
        const lastMessage =
            conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) return NextResponse.json(conversation);

        //Update seen on last Message
        const updatedMessage = await prisma.message.update({
            where: { id: lastMessage.id },
            include: { seen: true, sender: true },
            data: { seen: { connect: { id: currentUser.id } } },
        });

        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
