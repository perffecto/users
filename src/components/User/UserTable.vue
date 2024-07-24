<script setup lang="ts">
import { usePagination } from '../../composables/usePagination';
import { useSearchAndSort } from '../../composables/useSearchAndSort';
import { useUserActions } from '../../composables/useUserActions';
import { User } from '../../types/User';

const { users, addUser, editUser, deleteUser } = useUserActions();
const { search, setSortKey, searchAndSorted } = useSearchAndSort(users);

const itemsPerPage = 5;
const {
    current,
    total,
    nextPage,
    prevPage,
    paginatedItems,
} = usePagination(searchAndSorted, itemsPerPage);


function sort(event: Event) {
    const target = event.target as HTMLElement;

    if ( target && target.hasAttribute('data-sort') ) {
        const sortKey = target.getAttribute('data-sort') as keyof User;
        setSortKey(sortKey);
    }
}
</script>

<template>
    <div class="user-header">
        <h2>Users</h2>
        <button @click="addUser">Add User</button>
    </div>

    <input v-model="search" placeholder="Search" class="user-search" />

    <table class="user-table">
        <tr @click="sort">
            <th data-sort="id">Id</th>
            <th data-sort="firstName">First Name</th>
            <th data-sort="secondName">Second Name</th>
            <th data-sort="email">Email</th>
            <th data-sort="lastVisitedAt">Last Visited</th>
            <th>Actions</th>
        </tr>

        <tr v-for="user in paginatedItems" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.secondName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ new Date(user.lastVisitedAt).toLocaleString() }}</td>
            <td>
                <button @click="editUser(user)">Edit</button>
                <button @click="deleteUser(user.id)">Delete</button>
            </td>
        </tr>
    </table>

    <div>
        <button @click="prevPage" :disabled="current === 1">Previous</button>
        Page {{ current }} of {{ total }}
        <button @click="nextPage" :disabled="current >= total">Next</button>
    </div>
</template>

<style>
    /* Обычно я юзаю less + БЭМ */

    .user-header {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-header button {
        margin-left: 12px;
    }

    .user-search {
        width: 300px;
        margin-bottom: 24px;
        padding: 3px 12px;
        font-size: 1.25rem;
        border-radius: 4px;
        border: 1px solid #ccc;

        &::placeholder {
            font-weight: 300;
        }
    }

    .user-table {
        table-layout: fixed;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    .user-table th,
    .user-table td {
        padding: 0.5rem 1rem;
    }

    .user-table th {
        background: #f3f3f3;
        cursor: pointer;
        user-select: none;
    }

    .user-table button {
        margin: 0 3px;
    }

    .user-table tr:nth-child(odd) td {
        background: #f3f3f3;
    }
</style>
