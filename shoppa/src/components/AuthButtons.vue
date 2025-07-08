<template>
  <div>
    <div v-if="authStore.authLoading">Checking authentication...</div>
    <div
      v-else-if="authStore.currentUser"
      class="relative flex items-center justify-between gap-2 bg-indigo-900 p-3"
    >
      <p class="text-sm text-white">
        {{ authStore.currentUser.displayName || authStore.currentUser.email }}
      </p>
      <img
        class="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        :src="authStore.currentUser.photoURL ?? undefined"
        alt=""
      />
      <button class="cursor-pointer rounded-md text-indigo-400" @click="signOut">Sign Out</button>
    </div>
    <div v-else class="flex items-center justify-center gap-2 p-2">
      <p>not signed in</p>
    </div>
    <div v-if="authStore.authError" class="mt-2 text-red-500">{{ authStore.authError }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
const authStore = useAuthStore()
const router = useRouter()
const shoppingListsStore = useShoppingListsStore()

async function signOut() {
  await authStore.signOutUser()
  router.push('/')
}
</script>

<style scoped></style>
