import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { UsersList } from "@/app/users/components/UsersList";
import { FC, ReactNode } from "react";

interface IUsersLayoutProps {
    children: ReactNode;
}

//@ts-expect-error Server Component
const UsersLayout: FC<IUsersLayoutProps> = async ({ children }) => {
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-screen bg-gray-200">
                <UsersList users={users} />
                {children}
            </div>
            ;
        </Sidebar>
    );
};

export default UsersLayout;
