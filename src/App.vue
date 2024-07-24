<script setup lang="ts">
import { useUserActions } from './composables/useUserActions';
import UserList from './components/User/UserList.vue'

const {
  initialize,
  users,
  addUser,
  editUser,
  deleteUser
} = useUserActions();

initialize();
</script>

<template>
  <UserList
    :users="users"
    @add="addUser"
    @edit="editUser"
    @delete="deleteUser"
  />
</template>
