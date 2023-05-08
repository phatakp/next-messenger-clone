import { FC } from "react";
import { IconType } from "react-icons";

interface IAuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}

export const AuthSocialButton: FC<IAuthSocialButtonProps> = ({
    icon: Icon,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex justify-center w-full px-4 py-2 text-gray-500 bg-white rounded-md shadow-sm ring-1 ring-inset hover:bg-gray-50 focus:outline-offset-0"
        >
            <Icon />
        </button>
    );
};
