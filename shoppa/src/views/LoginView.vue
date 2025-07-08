<template>
  <button
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-indigo-500 p-4 text-white transition hover:scale-98 hover:bg-indigo-600"
    @click="signIn"
  >
    Sign In with Google
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
const router = useRouter()

async function signIn() {
  await authStore.signInWithGoogle()
  if (authStore.currentUser) {
    router.push('/lists')
  }
}
</script>

<style scoped></style>
