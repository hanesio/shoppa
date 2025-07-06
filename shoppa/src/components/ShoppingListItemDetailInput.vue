<template>
  <div class="relative my-10 flex cursor-pointer items-center justify-between gap-4 px-2">
    <input
      type="text"
      @change="updateItem"
      v-model="itemName"
      class="w-full border-b-3 border-indigo-300 py-2 text-2xl outline-none"
      :class="[purchased ? 'text-gray-500 line-through' : colorClass.text]"
    />
    <button
      v-if="!purchased"
      @click="$emit('purchase')"
      class="flex h-10 w-10 shrink-0 rounded-full border-3 border-indigo-300"
    ></button>
    <IconCheck @click="$emit('put-back')" v-else class="h-10 w-10 shrink-0 text-indigo-200" />
  </div>
</template>

<script setup lang="ts">
import { type OrderedCategory } from '@/stores/CategoryStore'
import { ref } from 'vue'
import { computed } from 'vue'
import IconCheck from './icons/IconCheck.vue'

const props = withDefaults(
  defineProps<{
    category?: OrderedCategory
    purchased?: boolean
    modelValue: string
  }>(),
  {
    category: () => ({
      name: 'Sonstiges',
      order: 0,
      color: {
        text: 'text-gray-500',
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-200',
      },
    }),
  },
)

const emit = defineEmits<{
  (e: 'purchase'): void
  (e: 'put-back'): void
  (e: 'update:modelValue', value: string): void
  (e: 'updateItem'): void
}>()

const colorClass = computed(
  () =>
    props.category.color || {
      text: 'text-gray-500',
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      hover: 'hover:bg-gray-200',
    },
)

const itemName = ref(props.modelValue)

function updateItem() {
  emit('update:modelValue', itemName.value)
  emit('updateItem')
}
</script>
<style scoped></style>
