<template>
  <div
    class="flex cursor-pointer items-center justify-between px-8 py-4 text-lg hover:bg-indigo-200"
  >
    <button @click="$emit('showInvite')" class="mr-10 flex w-16 cursor-pointer justify-center">
      <IconInvite class="size-8 text-indigo-500" />
    </button>
    <div @click="showList" class="flex w-full justify-between">
      <p>{{ name }}</p>
      <p>{{ itemCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconInvite from './icons/IconInvite.vue'

const props = defineProps<{
  name: string
  itemCount: number
}>()

const emit = defineEmits<{
  (e: 'showInvite'): void
  (e: 'showList'): void
}>()

function showList() {
  emit('showList')
}
</script>
<style scoped></style>
