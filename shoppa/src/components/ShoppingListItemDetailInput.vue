<template>
  <div
    class="relative flex cursor-pointer items-center justify-between gap-4 rounded-sm bg-gray-100 px-4 py-2 transition active:scale-98"
  >
    <div
      class="absolute left-0 my-2 h-4/5 w-2 rounded-l-sm rounded-r-xl"
      :class="colorClass.bg"
    ></div>
    <input
      type="text"
      @change="updateItem"
      v-model="itemName"
      class="w-full text-6xl outline-none"
      :class="[purchased ? 'text-gray-500 line-through' : colorClass.text]"
    />
    <button
      v-if="!purchased"
      @click="$emit('purchase')"
      class="flex h-10 w-10 shrink-0 rounded-full border-3 border-indigo-300"
    ></button>
    <IconCheck @click="$emit('put-back')" v-else class="h-12 w-12 shrink-0 text-indigo-200" />
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
