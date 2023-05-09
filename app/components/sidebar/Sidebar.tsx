import getCurrentUser from "@/app/actions/getCurrentUser";
import { DesktopSidebar } from "@/app/components/sidebar/DesktopSidebar";
import { MobileFooter } from "@/app/components/sidebar/MobileFooter";
import { FC, ReactNode } from "react";

interface ISidebarProps {
    children: ReactNode;
}

//@ts-expect-error Server Component
const Sidebar: FC<ISidebarProps> = async ({ children }) => {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-screen">
            <DesktopSidebar currentUser={currentUser} />
            <MobileFooter />
            <main className="h-screen lg:pl-20">{children}</main>
        </div>
    );
};

export default Sidebar;
