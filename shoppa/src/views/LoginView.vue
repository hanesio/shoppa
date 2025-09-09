<template>
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <img src="@/assets/images/Shoppa_Logo.svg" alt="Shoppa Logo" class="w-80" />
    <p class="text-center text-sm font-light">
      Einkaufslisten <br />
      einfach gut sortiert.
    </p>
  </div>

  <button
    class="absolute top-1/2 left-1/2 flex w-56 -translate-x-1/2 -translate-y-1/2 cursor-pointer gap-2 rounded-full border-2 border-indigo-500 p-4 text-indigo-600 transition hover:scale-98 hover:bg-indigo-800 hover:text-white"
    @click="signIn"
  >
    <IconGoogle /> Mit Google einloggen
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import IconGoogle from '@/components/icons/IconGoogle.vue'
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
