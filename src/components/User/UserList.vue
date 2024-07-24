<script setup lang="ts">
import { User } from '../../types/User';

interface UserListProps {
    users: User[];
}

defineProps<UserListProps>();

interface Emits {
    (e: 'add'): void;
    (e: 'edit', value: User): void;
    (e: 'delete', value: number): void;
}

defineEmits<Emits>();
</script>

<template>
    <div>
        <h2>User List</h2>

        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.firstName }} {{ user.secondName }} ({{ user.email }}) - Last Visited: {{ new Date(user.lastVisitedAt).toLocaleString() }}
                <button @click="$emit('edit', user)">Edit</button>
                <button @click="$emit('delete', user.id)">Delete</button>
            </li>
        </ul>

        <button @click="$emit('add')">Add User</button>
    </div>
</template>
