import { UserDataService } from "@/application/services/UserDataService";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserInMemoryRepository } from "@/infrastructure/repositories/UserInMemoryRepository";

let userRepository: UserRepository;

export function useUserRepository() {
    if ( !userRepository ) {
        const userDataService = new UserDataService();
        const users = userDataService.loadUserData();

        userRepository = new UserInMemoryRepository(users);
    }

    return { userRepository };
}
