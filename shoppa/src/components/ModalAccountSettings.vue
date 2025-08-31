<template>
  <ModalBase :dialogOpen title="Einstellungen">
    <div>
      <button class="cursor-pointer rounded-md text-indigo-400" @click="signOut">ausloggen</button>

      <div>Opt-Out</div>
      <div class="flex justify-end gap-2">
        <button
          class="cursor-pointer rounded-md bg-gray-200 px-2 py-0.5 hover:bg-gray-300"
          @click="$emit('close')"
        >
          abbrechen
        </button>
      </div>
    </div>
  </ModalBase>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import ModalBase from './ModalBase.vue'
import { useRouter } from 'vue-router'

const { dialogOpen } = defineProps<{
  dialogOpen: boolean
}>()

const router = useRouter()

async function signOut() {
  await authStore.signOutUser()
  router.push('/')
}

const authStore = useAuthStore()
</script>
