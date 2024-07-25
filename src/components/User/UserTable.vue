<script setup lang="ts">
import { User } from '@/types/User';
import { usePagination } from '@/composables/usePagination';
import { useSearchAndSort } from '@/composables/useSearchAndSort';
import { useUserActions } from '@/composables/useUserActions';

const { users, addUser, editUser, deleteUser } = useUserActions();
const { search, setSortKey, filtered: filteredUsers } = useSearchAndSort(users);

const ITEMS_PER_PAGE = 5;
const {
    current,
    total,
    nextPage,
    prevPage,
    paginated
} = usePagination(filteredUsers, ITEMS_PER_PAGE);


function sort(event: Event) {
    const target = event.target as HTMLElement;

    if ( target?.dataset.sortKey ) {
        setSortKey(target.dataset.sortKey as keyof User);
    }
}
</script>

<template>
    <div class="user-table">
        <div class="user-table__header">
            <h2 class="user-table__title">Users</h2>

            <button @click="addUser" class="user-table__button user-table__header-button">
                Add User
            </button>
        </div>

        <input v-model="search" placeholder="Search" class="user-table__search" />
    </div>


    <table class="user-table__table">
        <tr @click="sort" class="user-table__table-row">
            <th class="user-table__table-cell user-table__table-cell_type_head" data-sort-key="id">Id</th>
            <th class="user-table__table-cell user-table__table-cell_type_head" data-sort-key="firstName">First Name</th>
            <th class="user-table__table-cell user-table__table-cell_type_head" data-sort-key="secondName">Second Name</th>
            <th class="user-table__table-cell user-table__table-cell_type_head" data-sort-key="email">Email</th>
            <th class="user-table__table-cell user-table__table-cell_type_head" data-sort-key="lastVisitedAt">Last Visited</th>
            <th class="user-table__table-cell user-table__table-cell_type_head">Actions</th>
        </tr>

        <tr v-for="user in paginated" :key="user.id" class="user-table__table-row">
            <td class="user-table__table-cell">{{ user.id }}</td>
            <td class="user-table__table-cell">{{ user.firstName }}</td>
            <td class="user-table__table-cell">{{ user.secondName }}</td>
            <td class="user-table__table-cell">{{ user.email }}</td>
            <td class="user-table__table-cell">{{ new Date(user.lastVisitedAt).toLocaleString() }}</td>
            <td class="user-table__table-cell">
                <button class="user-table__button" @click="editUser(user)">Edit</button>
                <button class="user-table__button" @click="deleteUser(user.id)">Delete</button>
            </td>
        </tr>
    </table>

    <div>
        <button @click="prevPage" :disabled="current === 1">Previous</button>
        Page {{ current }} of {{ total }}
        <button @click="nextPage" :disabled="current >= total">Next</button>
    </div>
</template>

<style lang="less">
    .user-table {
        @bl: ~'.user-table';

        &__header {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__header-button {
            margin-left: 12px;
        }

        &__search {
            width: 300px;
            margin-bottom: 24px;
            padding: 12px 12px;
            font-size: 1.25rem;
            border-radius: 4px;
            border: 1px solid #ccc;

            &::placeholder {
                font-weight: 300;
            }
        }

        &__table {
            margin-bottom: 1rem;
            table-layout: fixed;
            border-collapse: collapse;
        }

        &__table-row:nth-child(odd) {
            background: #f3f3f3;
        }

        &__table-cell {
            padding: 0.5rem 1rem;

            &_type_head {
                background: #f3f3f3;
                cursor: pointer;
                user-select: none;
            }
        }

        &__button:not(:last-child) {
            margin-right: 6px;
        }
    }
</style>
