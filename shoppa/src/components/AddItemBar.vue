<template>
  <div class="flex w-full flex-col border-b-2 border-indigo-500 bg-white pt-1">
    <div class="flex flex-col gap-4 py-4">
      <PillSelect
        :items="shopNames"
        v-model="newShopName"
        :color="{ bg: 'bg-rose-200', text: 'text-rose-900', border: 'border-rose-400' }"
      />
      <!-- <select>
        <option value=""></option>
      </select> -->
      <PillSelect
        :items="categoryNames"
        :colors="categoryColors"
        v-model="newItemCategory"
        :color="{ bg: 'bg-blue-200', text: 'text-blue-900', border: 'border-blue-400' }"
      />
    </div>

    <div class="justiy-end flex items-center gap-2 bg-gray-100 px-4 py-1">
      <input
        ref="inputRef"
        type="text"
        placeholder="1kg Mehl"
        class="w-full rounded-sm p-2 focus:ring-0 focus:ring-indigo-500 focus:outline-none"
        v-model="newItemName"
        @keyup.enter="addItem"
        @keyup.esc="newItemName = ''"
      />
      <ButtonSubmit @click="addItem" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PillSelect from '@/components/PillSelect.vue'
import { nextTick, ref, watch } from 'vue'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import ButtonSubmit from './ButtonSubmit.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps<{
  shopNames: string[]
  categoryNames: string[]
  listId: string
  focus: boolean
}>()
const emit = defineEmits<{
  (e: 'addItem'): void
}>()

const shoppingListsStore = useShoppingListsStore()
const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const categoryColors = categoryStore.categories.map((category) => category.color)

const newItemName = ref('')
const newItemCategory = ref('Sonstiges') // Default category
const newShopName = ref('Supermarkt')

const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.focus,
  (val) => {
    if (val) {
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  },
)

watch(newItemCategory, () => {
  inputRef.value?.focus()
})
watch(newShopName, () => {
  inputRef.value?.focus()
})
async function addItem() {
  if (newItemName.value != '') {
    await shoppingListsStore.addItemToList(props.listId, {
      name: newItemName.value,
      category: newItemCategory.value,
      purchased: false,
      dateAdded: new Date().toISOString(),
      shopName: newShopName.value,
      author: authStore.currentUser?.displayName || 'nobody',
    })

    newItemName.value = ''
    emit('addItem')
    inputRef.value?.focus()
  }
}
</script>
