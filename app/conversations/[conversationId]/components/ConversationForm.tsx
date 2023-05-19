"use client";

import { MessageInput } from "@/app/conversations/[conversationId]/components/MessageInput";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
interface IConversationFormProps {}

export const ConversationForm: FC<IConversationFormProps> = (props) => {
    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { message: "" },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post("/api/messages", { ...data, conversationId });
        setValue("message", "", { shouldValidate: true });
    };

    const handleUpload = (result: any) => {
        axios.post("/api/messages", {
            image: result?.info?.secure_url,
            conversationId,
        });
    };

    return (
        <div className="flex items-center w-full gap-2 p-4 bg-white border-t lg:gap-4">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="messenger-clone"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center w-full gap-2 lg:gap-4"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />

                <button className="p-2 transition rounded-full cursor-pointer bg-sky-500 hover:bg-sky-600">
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
};
