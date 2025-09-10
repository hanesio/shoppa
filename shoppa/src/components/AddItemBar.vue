<template>
  <div class="w-full border-b-2 border-indigo-500 bg-white">
    <div class="flex flex-col" ref="contentRef">
      <div class="flex flex-col gap-4 py-4 pl-1">
        <PillSelect :items="shopNames" v-model="newShopName" />

        <PillSelect :items="categoryNames" v-model="newItemCategory" />
      </div>

      <div class="flex items-center justify-end gap-6 bg-gray-100 px-4 py-1 lg:gap-8">
        <input
          ref="inputRef"
          type="text"
          placeholder="1kg Mehl"
          class="w-full rounded-sm p-2 focus:ring-0 focus:ring-indigo-500 focus:outline-none"
          v-model="newItemName"
          @keyup.enter="addItem"
          @keyup.esc="$emit('close')"
          autocapitalize="on"
        />
        <ButtonClearInput v-if="newItemName" @click="newItemName = ''" />
        <ButtonSubmit @click="addItem" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PillSelect from '@/components/PillSelect.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import ButtonSubmit from './ButtonSubmit.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useAuthStore } from '@/stores/authStore'
import { onClickOutside } from '@vueuse/core'
import { useShopTypeStore } from '@/stores/shopTypeStore'
import { useShopStore } from '@/stores/shopStore'
import ButtonClearInput from './ButtonClearInput .vue'

const props = defineProps<{
  shopNames: string[]
  listId: string
  focus: boolean
  barOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'addItem'): void
  (e: 'close'): void
}>()

const shoppingListsStore = useShoppingListsStore()
const categoryStore = useCategoryStore()
const shopStore = useShopStore()
const shopTypeStore = useShopTypeStore()
const authStore = useAuthStore()

const barRef = ref<HTMLDialogElement>()
const contentRef = ref<HTMLDialogElement>()
const inputRef = ref<HTMLInputElement | null>(null)

const newShopName = ref(props.shopNames[0] || 'ALDI')
const categoryNames = computed(() => {
  const shopType = shopStore.getTypeByShop(newShopName.value)
  if (shopType) return shopTypeStore.getCategoriesByType(shopType)
  else return ['none']
})

const newItemName = ref('')
const newItemCategory = ref(categoryNames.value ? categoryNames.value[0] : 'Sonstiges')

const categoryColors = computed(() => {
  if (categoryNames.value)
    return categoryStore.categories
      .filter((category) => categoryNames.value!.includes(category.name)) // TODO: make secure
      .map((category) => category.color)

  return []
})

const show = computed(() => {
  return props.barOpen
})

watch(show, () => {
  if (barRef.value) {
    if (show.value) barRef.value.showModal()
    else barRef.value.close()
  }
})

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
  if (categoryNames.value) newItemCategory.value = categoryNames.value[0]
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
onClickOutside(contentRef, (event: MouseEvent) => emit('close'))
</script>
<style></style>
