import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/userStore';
import usersData from '../assets/users.json';
import { toUserModel, UpdateUserPayload } from '../types/User';

export function useUserActions() {
    const store = useUserStore();
    const { users } = storeToRefs(store);

    const initialize = () => {
        const users = usersData.map(toUserModel);
        store.initialize(users);
    };

    const addUser = () => {
        const firstName = prompt("Enter first name:");
        const secondName = prompt("Enter second name:");
        const email = prompt("Enter email:");
        const lastVisitedAt = Date.now();

        if ( firstName && secondName && email ) {
            store.addUser({ firstName, secondName, email, lastVisitedAt });
        }
    };

    const editUser = (user: UpdateUserPayload) => {
        const firstName = prompt("Enter new first name:", user.firstName);
        const secondName = prompt("Enter new second name:", user.secondName);
        const email = prompt("Enter new email:", user.email);
        const lastVisitedAt = Date.now();

        if ( firstName && secondName && email ) {
            store.updateUser({ id: user.id, firstName, secondName, email, lastVisitedAt });
        }
    };

    const deleteUser = (id: number) => {
        if ( confirm('Are you sure?') ) {
            store.deleteUser(id);
        }
    };

    return {
        initialize,
        addUser,
        editUser,
        deleteUser,
        users,
    };
}
