import { User } from "@/domain/User";
import { defineStore } from "pinia";

interface State {
    users: User[];
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        users: [],
    }),

    actions: {
        initialize(users: User[]): void {
            this.users = users;
        },

        createUser(user: User): User {
            this.users.push(user);
            return user;
        },

        updateUser(updatedUser: User): User {
            const user = this.users.find(user => user.id === updatedUser.id);

            return user
                ? Object.assign(user, updatedUser)
                : updatedUser;
        },

        deleteUser(id: number): void {
            this.users = this.users.filter(user => user.id !== id);
        },
    },
});
