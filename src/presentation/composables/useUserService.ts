import { UserManagementService } from "@/application/services/UserManagementService";
import { UserViewService } from "@/application/services/UserViewService";
import { User } from "@/domain/models/User";
import { computed, ref, watch } from "vue";
import { useUserRepository } from "@/presentation/composables/useUserRepository";
import { SortOrder } from "@/application/services/types";

export function useUserService() {
    const { userRepository } = useUserRepository();

    const userManagementService = new UserManagementService(userRepository);
    const userViewService = new UserViewService();

    const allUsers = computed(() => userRepository.getUsers().value);

    const searchQuery = ref('');
    const filteredUsers = computed(() => {
        return userViewService.filterUsers(allUsers.value, searchQuery.value);
    });

    const sortKey = ref<keyof User>('id');
    const sortOrder = ref<SortOrder>('asc');
    const sortedUsers = computed(() => {
        return userViewService.sortUsers(filteredUsers.value, sortKey.value, sortOrder.value);
    });

    const setSortKey = (key: keyof User) => {
        if ( sortKey.value === key ) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey.value = key;
            sortOrder.value = 'asc';
        }
    };


    const currentPage = ref(1);
    const perPage = ref(10);

    const setCurrentPage = (page: number) => {
        if ( page >= 1 && page <= totalPages.value ) {
            currentPage.value = page;
        }
    };

    const nextPage = () => {
        if ( currentPage.value < totalPages.value ) {
            setCurrentPage(++currentPage.value);
        }
    };

    const prevPage = () => {
        if ( currentPage.value > 1 ) {
            setCurrentPage(--currentPage.value);
        }
    };

    const totalPages = computed(() => {
        return userViewService.getTotalPages(sortedUsers.value, perPage.value);
    });

    const users = computed(() => {
        return userViewService.paginate(sortedUsers.value, currentPage.value, perPage.value);
    });

    watch([users, () => perPage], () => {
        if ( currentPage.value > totalPages.value ) {
            currentPage.value = 1;
        }
    });

    const createUser = () => {
        const firstName = prompt("Enter first name:");
        const secondName = prompt("Enter second name:");
        const email = prompt("Enter email:");

        if ( firstName && secondName && email ) {
            userManagementService.createUser({
                firstName,
                secondName,
                email,
                lastVisitedAt: Date.now()
            });
        }
    };

    const editUser = (user: User) => {
        const firstName = prompt("New first name:", user.firstName);
        const secondName = prompt("New second name:", user.secondName);
        const email = prompt("New email:", user.email);

        if ( firstName && secondName && email ) {
            userManagementService.updateUser({
                id: user.id,
                firstName,
                secondName,
                email,
                lastVisitedAt: Date.now(),
            });
        }
    };

    const deleteUser = (id: number) => {
        if ( confirm('Are you sure?') ) {
            userManagementService.deleteUser(id);
        }
    };

    return {
        searchQuery,
        setSortKey,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        users,
        createUser,
        editUser,
        deleteUser,
    }
}
