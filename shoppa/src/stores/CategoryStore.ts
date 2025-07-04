import { defineStore } from 'pinia'

interface OrderedCategory {
  name: string
  order: number
}

interface CategoryState {
  categories: OrderedCategory[]
}

export const useCategoryStore = defineStore('categories', {
  state: (): CategoryState => {
    return {
      categories: [
        { name: 'Obst & Gemüse', order: 1 },
        { name: 'Fleisch & Wurst', order: 2 },
        { name: 'Milchprodukte', order: 3 },
        { name: 'Getränke', order: 4 },
        { name: 'Sonstiges', order: 5 },
      ],
    }
  },
  actions: {
    addCategory(name: string) {
      const newOrder = this.categories.length + 1
      this.categories.push({ name, order: newOrder })
    },
    removeCategory(name: string) {
      this.categories = this.categories.filter((category) => category.name !== name)
    },
  },
  getters: {
    getCategoryByName: (state) => {
      return (name: string) => state.categories.find((category) => category.name === name)
    },
    getCategoryByOrder: (state) => {
      return (order: number) => state.categories.find((category) => category.order === order)
    },
  },
})
