<template>
  <div>
    <h4>Invite Collaborator to {{ listName }}</h4>
    <input v-model="inviteEmail" type="email" placeholder="Enter collaborator's email" />
    <button @click="handleInvite">Invite</button>
    <p
      v-if="inviteStatus"
      :class="{ success: inviteStatus === 'success', error: inviteStatus === 'error' }"
    >
      {{ inviteMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useShoppingListsStore } from '../stores/shoppingListsStore'

const props = defineProps<{
  listId: string
  listName: string
}>()

const authStore = useAuthStore()
const shoppingListsStore = useShoppingListsStore()
const inviteEmail = ref('')
const inviteStatus = ref<'success' | 'error' | null>(null)
const inviteMessage = ref('')

const handleInvite = async () => {
  inviteStatus.value = null
  inviteMessage.value = ''

  if (!inviteEmail.value) {
    inviteStatus.value = 'error'
    inviteMessage.value = 'Please enter an email address.'
    return
  }

  // 1. Find the invited user's UID
  const invitedUserUid = await authStore.findUserUidByEmail(inviteEmail.value)

  if (!invitedUserUid) {
    inviteStatus.value = 'error'
    inviteMessage.value = `No user found with email: ${inviteEmail.value}. They might need to sign up first.`
    return
  }

  if (invitedUserUid === authStore.currentUser?.uid) {
    inviteStatus.value = 'error'
    inviteMessage.value = 'You are already an author of this list.'
    return
  }

  // 2. Invite the user to the list
  try {
    await shoppingListsStore.inviteUserToShoppingList(props.listId, invitedUserUid)
    inviteStatus.value = 'success'
    inviteMessage.value = `Successfully invited ${inviteEmail.value}!`
    inviteEmail.value = '' // Clear input
  } catch (error) {
    inviteStatus.value = 'error'
    inviteMessage.value = `Failed to invite user: ${shoppingListsStore.error || 'Unknown error'}`
  }
}
</script>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
