"use client";

import { MobileItem } from "@/app/components/sidebar/MobileItem";
import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import { FC } from "react";

interface IMobileFooterProps {}

export const MobileFooter: FC<IMobileFooterProps> = (props) => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) return null;

    return (
        <div className="fixed bottom-0 z-40 flex items-center justify-between w-full bg-white border-t lg:hidden">
            {routes.map((route) => (
                <MobileItem key={route.label} {...route} />
            ))}
        </div>
    );
};
