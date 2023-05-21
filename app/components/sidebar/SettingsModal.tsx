import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { Input } from "@/app/components/inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ISettingsModalProps {
    isOpen?: boolean;
    currentUser: User | null;
    onClose: () => void;
}

export const SettingsModal: FC<ISettingsModalProps> = ({
    isOpen,
    currentUser,
    onClose,
}) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsloading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="pb-12 border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 ">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information.
                        </p>

                        <div className="flex flex-col mt-10 gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />

                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900 "
                                >
                                    Photo
                                </label>
                                <div className="flex items-center mt-2 gap-x-3">
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={
                                            image ||
                                            currentUser?.image ||
                                            "/images/placeholder.jpg"
                                        }
                                        alt="Avatar"
                                    />

                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="messenger-clone"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-6 gap-x-6">
                    <Button disabled={isLoading} secondary onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
