<template>
  <div>
    <div class="text-center" v-if="authStore.authLoading">überprüfe Authentifizierung...</div>
    <div
      v-else-if="authStore.currentUser"
      class="relative flex items-center justify-between gap-2 bg-indigo-900 p-3"
    >
      <p class="text-sm text-white">
        {{ authStore.currentUser.displayName || authStore.currentUser.email }}
      </p>
      <img
        @click="$emit('openSettings')"
        class="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
        :src="authStore.currentUser.photoURL ?? undefined"
        alt="profile picture"
      />
    </div>
    <div v-else class="flex items-center justify-center gap-2 p-2">
      <p>Shoppa</p>
    </div>
    <div v-if="authStore.authError" class="mt-2 text-red-500">{{ authStore.authError }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
</script>

<style scoped></style>
