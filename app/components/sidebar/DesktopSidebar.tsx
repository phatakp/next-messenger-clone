"use client";

import { Avatar } from "@/app/components/Avatar";
import { DesktopItem } from "@/app/components/sidebar/DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
import { type User } from "@prisma/client";
import { FC, useState } from "react";

interface IDesktopSidebarProps {
    currentUser: User | null;
}

export const DesktopSidebar: FC<IDesktopSidebarProps> = ({ currentUser }) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="justify-between hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col">
            <nav className="flex flex-col justify-between mt-4">
                <ul
                    role="list"
                    className="flex flex-col items-center space-y-1"
                >
                    {routes.map((route) => (
                        <DesktopItem key={route.label} {...route} />
                    ))}
                </ul>
            </nav>

            <nav className="flex flex-col items-center justify-between mt-4">
                <div
                    className="transition cursor-pointer hover:opacity-70"
                    onClick={() => setIsOpen}
                >
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    );
};
