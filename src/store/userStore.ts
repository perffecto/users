import { defineStore } from "pinia";
import { AddUserPayload, UpdateUserPayload, User } from "../types/User";

interface State {
    users: User[];
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        users: [],
    }),

    actions: {
        initialize(users: User[]) {
            this.users = users;
        },

        addUser(payload: AddUserPayload) {
            const lastUser = this.users[this.users.length - 1];
            const lastId = lastUser?.id ?? 0;

            const user: User = {
                id: lastId + 1,
                ...payload,
            };

            this.users.push(user);
        },

        updateUser({ id, ...payload }: UpdateUserPayload) {
            const user = this.users.find(user => user.id === id);

            if ( user ) {
                Object.assign(user, payload);
            }
        },

        deleteUser(id: number) {
            this.users = this.users.filter(user => user.id !== id);
        },
    },
});
