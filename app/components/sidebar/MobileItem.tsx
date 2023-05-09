"use client";

import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface IMobileItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

export const MobileItem: FC<IMobileItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (!!onClick) return onClick();
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(
                "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
                active && "bg-gray-100 text-black"
            )}
        >
            <Icon className="w-6 h-6" />
        </Link>
    );
};
