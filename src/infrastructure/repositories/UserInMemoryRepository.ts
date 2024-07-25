import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/models/User';
import { useUserStore } from '@/infrastructure/store/userStore';
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';

export class UserInMemoryRepository implements UserRepository {
    private store = useUserStore();

    constructor(users: User[] = []) {
        this.store.initialize(users);
    }

    getUsers(): Ref<User[]> {
        return storeToRefs(this.store).users;
    }

    createUser(user: User): User {
        return this.store.createUser(user);
    }

    updateUser(user: User): User {
        return this.store.updateUser(user);
    }

    deleteUser(id: number): void {
        this.store.deleteUser(id);
    }

    getLastId(): number {
        const users = this.store.users;
        const lastUser = users[users.length - 1];

        return lastUser?.id ?? 0;
    }
}
