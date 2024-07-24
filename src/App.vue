<script setup lang="ts">
import { useUserActions } from './composables/useUserActions';
import UserTable from './components/User/UserTable.vue'

const { initialize } = useUserActions();
initialize();
</script>

<template>
  <UserTable />
</template>
