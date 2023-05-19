import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInputProps {
    id: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

export const MessageInput: FC<IMessageInputProps> = ({
    id,
    placeholder,
    type,
    required,
    register,
    errors,
}) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="w-full px-4 py-2 font-light text-black rounded-full bg-neutral-100 focus:outline-none"
            />
        </div>
    );
};
