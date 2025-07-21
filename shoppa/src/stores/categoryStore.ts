import { defineStore } from 'pinia'

export interface OrderedCategory {
  name: string
  order: number
  color: {
    text: string
    bg: string
    border: string
    hover: string
  }
}

interface CategoryState {
  categories: OrderedCategory[]
}

export const useCategoryStore = defineStore('categories', {
  state: (): CategoryState => {
    return {
      categories: [
        {
          name: 'Sonstiges',
          order: 0,
          color: {
            text: 'text-gray-800',
            bg: 'bg-gray-200',
            border: 'border-gray-400',
            hover: 'hover:bg-gray-300',
          },
        },
        {
          name: 'Obst & Gemüse',
          order: 1,
          color: {
            text: 'text-lime-800',
            bg: 'bg-lime-200',
            border: 'border-lime-400',
            hover: 'hover:bg-lime-300',
          },
        },
        {
          name: 'Fleisch & Wurst',
          order: 2,
          color: {
            text: 'text-pink-800',
            bg: 'bg-pink-200',
            border: 'border-pink-400',
            hover: 'hover:bg-pink-300',
          },
        },
        {
          name: 'Milchprodukte',
          order: 3,
          color: {
            text: 'text-blue-800',
            bg: 'bg-blue-200',
            border: 'border-blue-400',
            hover: 'hover:bg-blue-300',
          },
        },
        {
          name: 'Getränke',
          order: 4,
          color: {
            text: 'text-purple-800',
            bg: 'bg-purple-200',
            border: 'border-purple-400',
            hover: 'hover:bg-purple-300',
          },
        },
        {
          name: 'Tiefkühl',
          order: 5,
          color: {
            text: 'text-cyan-800',
            bg: 'bg-cyan-200',
            border: 'border-cyan-400',
            hover: 'hover:bg-cyan-300',
          },
        },
        {
          name: 'Backwaren',
          order: 6,
          color: {
            text: 'text-yellow-800',
            bg: 'bg-yellow-200',
            border: 'border-yellow-400',
            hover: 'hover:bg-yellow-300',
          },
        },
        {
          name: 'Aktion',
          order: 7,
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
        },
      ],
    }
  },
  actions: {
    addCategory(name: string, color: { text: string; bg: string; border: string; hover: string }) {
      const newOrder = this.categories.length + 1
      this.categories.push({ name, order: newOrder, color })
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
