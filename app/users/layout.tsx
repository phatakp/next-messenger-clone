import Sidebar from "@/app/components/sidebar/Sidebar";
import { FC, ReactNode } from "react";

interface IUsersLayoutProps {
    children: ReactNode;
}

//@ts-expect-error Server Component
const UsersLayout: FC<IUsersLayoutProps> = async ({ children }) => {
    return (
        <Sidebar>
            <div className="h-screen">{children}</div>;
        </Sidebar>
    );
};

export default UsersLayout;
