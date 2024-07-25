import userData from '@/assets/users.json';
import { User } from '@/domain/models/User';

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    lastVisitedAt: number;
}

const toUserModel = (data: UserData): User => {
    const { lastName: secondName, ...fields } = data;
    return { ...fields, secondName };
};

export class UserDataService {
    loadUserData(): User[] {
        return userData.map(toUserModel);
    }
}
