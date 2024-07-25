import { User } from '@/domain/User';
import { Ref } from 'vue';

export interface UserRepository {
    getUsers(): Ref<User[]>;
    createUser(user: User): User;
    updateUser(user: User): User;
    deleteUser(id: number): void;
    getLastId(): number;
}
