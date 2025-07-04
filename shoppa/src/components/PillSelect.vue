<template>
  <div class="flex w-full flex-wrap items-center gap-1 py-0.5">
    <CategoryPill
      v-for="item in items"
      :key="item"
      :name="item"
      :color
      :selected="item === selected"
      @click="updateValue(item)"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryPill from './CategoryPill.vue'
import { ref } from 'vue'
const props = defineProps<{
  items: string[]
  modelValue: string
  color: {
    bg: string
    text: string
    border: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selected = ref(props.modelValue)

const updateValue = (value: string) => {
  selected.value = value
  emit('update:modelValue', value)
}
</script>
<style scoped></style>
