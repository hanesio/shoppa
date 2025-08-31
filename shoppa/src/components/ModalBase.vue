<template>
  <div v-if="dialogOpen" ref="dialogRef">
    <div class="fixed top-0 left-0 z-20 flex h-screen w-screen bg-black opacity-20"></div>
    <div class="fixed top-1/2 left-1/2 z-30 w-80 -translate-1/2 rounded-sm bg-gray-100">
      <div class="flex justify-end px-2 pt-2">
        <h2 v-if="title" class="absolute top-1 left-4 text-lg font-semibold text-indigo-500">
          {{ title }}
        </h2>
        <button
          @click="$emit('close')"
          class="flex cursor-pointer items-center justify-center p-1 text-indigo-400 hover:text-indigo-600"
        >
          <IconClose class="shrink-0" />
        </button>
      </div>
      <div class="p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClose from './icons/IconClose.vue'
const { dialogOpen } = defineProps<{
  dialogOpen: boolean
  title?: string
}>()
</script>

<style>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
