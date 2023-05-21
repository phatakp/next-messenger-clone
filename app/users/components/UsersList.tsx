import { UserBox } from "@/app/users/components/UserBox";
import { User } from "@prisma/client";
import { FC } from "react";

interface IUsersListProps {
    users: User[];
}

export const UsersList: FC<IUsersListProps> = ({ users }) => {
    return (
        <aside className="fixed inset-y-0 left-0 block w-full pb-20 overflow-y-auto border-r border-gray-200 lg:pb-0 lg:left-20 lg:w-80 lg:block">
            <div className="px-5">
                <div className="flex-col">
                    <div className="py-4 text-2xl font-bold text-neutral-800">
                        People
                    </div>
                </div>

                {users.map((user) => (
                    <UserBox key={user.id} user={user} />
                ))}
            </div>
        </aside>
    );
};
