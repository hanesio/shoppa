<template>
  <div
    class="w-full gap-1 py-0.5"
    :class="textSize === 'lg' ? 'grid grid-cols-2' : 'flex flex-wrap items-center'"
  >
    <CategoryPill
      v-for="(item, index) in items"
      :key="item"
      :name="item"
      :color="colors?.[index] || defaultColor"
      :selected="item === selected"
      :size="textSize"
      @click="updateValue(item)"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryPill from './CategoryPill.vue'
import { ref } from 'vue'
const props = defineProps<{
  items: string[]
  textSize?: 'sm' | 'md' | 'lg'
  modelValue: string
  colors?: {
    bg: string
    text: string
    border: string
  }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change'): void
}>()

const selected = ref(props.modelValue)
const defaultColor = {
  bg: 'bg-gray-100',
  text: 'text-black',
  border: 'border-black',
}

const updateValue = (value: string) => {
  selected.value = value
  emit('update:modelValue', value)
  emit('change')
}
</script>
<style scoped></style>
