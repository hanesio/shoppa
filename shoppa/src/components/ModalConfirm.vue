<template>
  <ModalBase :dialogOpen :title>
    <div class="relative">
      <h4 class="pb-4">
        {{ message }}
      </h4>

      <div class="flex justify-end gap-2">
        <button
          class="cursor-pointer rounded-md bg-indigo-500 px-2 py-0.5 text-white hover:bg-indigo-600"
          @click="$emit('confirm')"
        >
          bestätigen
        </button>
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
import ModalBase from './ModalBase.vue'

defineProps<{
  title: string
  message: string
  dialogOpen: boolean
}>()
</script>
