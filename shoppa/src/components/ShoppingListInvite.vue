<template>
  <dialog ref="dialogRef" class="rounded-sm">
    <div class="flex h-46 w-80 flex-col bg-gray-100 px-4 py-3">
      <h4>
        Lade jemanden zu <span class="font-semibold text-indigo-500">{{ listName }}</span> ein
      </h4>
      <div class="my-4">
        <input
          class="w-full border-b-2 border-indigo-500 focus:outline-0"
          @keyup.enter="handleInvite"
          v-model="inviteEmail"
          type="email"
          placeholder="E-Mail eines Kollaborateurs "
        />
        <p
          v-if="inviteStatus"
          class="text-sm"
          :class="{
            'text-green-500': inviteStatus === 'success',
            'text-red-500': inviteStatus === 'error',
          }"
        >
          {{ inviteMessage }}
        </p>
      </div>
      <div class="absolute right-4 bottom-4 flex gap-2">
        <button
          class="cursor-pointer rounded-md bg-indigo-500 px-2 py-0.5 text-white hover:bg-indigo-600"
          @click="handleInvite"
        >
          einladen
        </button>
        <button
          class="cursor-pointer rounded-md bg-gray-200 px-2 py-0.5 hover:bg-gray-300"
          @click="$emit('close')"
        >
          abbrechen
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useShoppingListsStore } from '../stores/shoppingListsStore'

const props = defineProps<{
  listId: string
  listName: string
  dialogOpen: boolean
}>()

const authStore = useAuthStore()
const shoppingListsStore = useShoppingListsStore()
const inviteEmail = ref('')
const inviteStatus = ref<'success' | 'error' | null>(null)
const inviteMessage = ref('')

const dialogRef = ref<HTMLDialogElement>()
const show = computed(() => {
  return props.dialogOpen
})

watch(show, () => {
  if (dialogRef.value) {
    show.value ? dialogRef.value.showModal() : dialogRef.value.close()
  }
})

const handleInvite = async () => {
  inviteStatus.value = null
  inviteMessage.value = ''

  if (!inviteEmail.value) {
    inviteStatus.value = 'error'
    inviteMessage.value = 'Bitte gib eine E-Mail-Adresse ein.'
    return
  }

  // 1. Find the invited user's UID
  const invitedUserUid = await authStore.findUserUidByEmail(inviteEmail.value)

  if (!invitedUserUid) {
    inviteStatus.value = 'error'
    inviteMessage.value = `Kein Benutzer mit E-Mail-Adresse: ${inviteEmail.value} gefunden. Möglicherweise muss dieser sich erst registrieren.`
    return
  }

  if (invitedUserUid === authStore.currentUser?.uid) {
    inviteStatus.value = 'error'
    inviteMessage.value = 'Du bist bereits ein Autor dieser Liste.'
    return
  }

  // 2. Invite the user to the list
  try {
    await shoppingListsStore.inviteUserToShoppingList(props.listId, invitedUserUid)
    inviteStatus.value = 'success'
    inviteMessage.value = `${inviteEmail.value} wurde erfolgreich eingeladen!`
    inviteEmail.value = '' // Clear input
  } catch (error) {
    inviteStatus.value = 'error'
    inviteMessage.value = `Benutzer konnte nicht eingeladen werden: ${shoppingListsStore.error || 'Unknown error'}`
  }
}
</script>

<style>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5px);
}
</style>
