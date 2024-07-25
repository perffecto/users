import { User } from "@/domain/models/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export type CreateUserFields = Omit<User, 'id'>;

export class UserManagementService {
    constructor(private userRepository: UserRepository) {}

    private generateNextId(): number {
        const lastId = this.userRepository.getLastId();

        return lastId + 1;
    }

    getUsers(): User[] {
        return this.userRepository.getUsers().value;
    }

    createUser(user: CreateUserFields): User {
        const id = this.generateNextId();

        return this.userRepository.createUser({ ...user, id });
    }

    updateUser(user: User): User {
        return this.userRepository.updateUser(user);
    }

    deleteUser(id: number): void {
        this.userRepository.deleteUser(id);
    }
}
