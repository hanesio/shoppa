<template>
  <footer class="sticky right-0 bottom-0 left-0 z-10 flex flex-col border-t bg-white pb-4">
    <div>
      <PillSelect
        :items="categoryNames"
        v-model="newItemCategory"
        :color="{ bg: 'bg-blue-200', text: 'text-blue-900', border: 'border-blue-400' }"
      />
      <PillSelect
        :items="shopNames"
        v-model="newShopName"
        :color="{ bg: 'bg-rose-200', text: 'text-rose-900', border: 'border-rose-400' }"
      />
    </div>
    <div class="justiy-end flex items-center gap-2">
      <input
        type="text"
        placeholder="1kg Mehl"
        class="w-full rounded-sm border p-2"
        v-model="newItemName"
        @keyup.enter="addItem"
        @keyup.esc="newItemName = ''"
      />
      <button>
        <IconArrowRight
          class="h-10 w-10 -rotate-90 cursor-pointer rounded-full bg-indigo-500 p-2 text-white active:scale-90"
          @click="addItem"
        />
      </button>
    </div>
  </footer>
</template>
<script setup lang="ts">
import PillSelect from '@/components/PillSelect.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { ref } from 'vue'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'

const props = defineProps<{
  shopNames: string[]
  categoryNames: string[]
  listId: string
}>()
const emit = defineEmits<{
  (e: 'addItem'): void
}>()

const shoppingListsStore = useShoppingListsStore()

const newItemName = ref('')
const newItemCategory = ref('Sonstiges') // Default category
const newShopName = ref('Supermarkt')

function addItem() {
  if (newItemName.value != '') {
    shoppingListsStore.addItemToList(props.listId, {
      name: newItemName.value,
      category: newItemCategory.value,
      shopId: '1',
      purchased: false,
      dateAdded: new Date().toISOString(),
      shopName: newShopName.value,
      author: 'Max Mustermann',
    })

    newItemName.value = ''
    emit('addItem')
  }
}
</script>
