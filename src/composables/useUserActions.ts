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

        if ( firstName && secondName && email ) {
            store.addUser({ firstName, secondName, email, lastVisitedAt: Date.now() });
        }
    };

    const editUser = (user: UpdateUserPayload) => {
        const firstName = prompt("New first name:", user.firstName);
        const secondName = prompt("New second name:", user.secondName);
        const email = prompt("New email:", user.email);

        if ( firstName && secondName && email ) {
            store.updateUser({ id: user.id, firstName, secondName, email, lastVisitedAt: Date.now() });
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
