import { UserDataService } from "@/application/UserDataService";
import { UserRepository } from "@/application/UserRepository";
import { UserInMemoryRepository } from "@/infrastructure/UserInMemoryRepository";

let userRepository: UserRepository;

export function useUserRepository() {
    if ( !userRepository ) {
        const userDataService = new UserDataService();
        const users = userDataService.loadUserData();

        userRepository = new UserInMemoryRepository(users);
    }

    return { userRepository };
}
