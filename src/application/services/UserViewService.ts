import { User } from "@/domain/models/User";

export type SortOrder = 'asc' | 'desc';

export class UserViewService {
    filterUsers(users: User[], searchQuery: string): User[] {
        if ( !searchQuery ) {
            return users;
        }

        const query = searchQuery.toLowerCase();

        return users.filter(user => {
            return Object.values(user).some(val => val.toString().toLowerCase().includes(query))
        });
    }

    sortUsers(users: User[], sortKey: keyof User, sortOrder: SortOrder): User[] {
        if ( !sortKey ) {
            return users;
        }

        return [...users].sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;
            }

            if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1;
            }

            return 0;
        });
    }

    paginate(users: User[], page: number, perPage: number): User[] {
        const start = (page - 1) * perPage;
        const end = start + perPage;

        return users.slice(start, end);
    }

    getTotalPages(users: User[], perPage: number): number {
        return Math.ceil(users.length / perPage);
    }
}
