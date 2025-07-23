import { defineStore } from 'pinia'

export interface ColouredCategory {
  name: string
  color: {
    text: string
    bg: string
    border: string
    hover: string
  }
  order: number
}

interface CategoryState {
  categories: ColouredCategory[]
}

export const useCategoryStore = defineStore('categories', {
  state: (): CategoryState => {
    return {
      categories: [
        {
          name: 'Sonstiges',
          color: {
            text: 'text-gray-800',
            bg: 'bg-gray-200',
            border: 'border-gray-400',
            hover: 'hover:bg-gray-300',
          },
          order: 0,
        },
        {
          name: 'Obst & Gemüse',
          color: {
            text: 'text-lime-800',
            bg: 'bg-lime-200',
            border: 'border-lime-400',
            hover: 'hover:bg-lime-300',
          },
          order: 1,
        },
        {
          name: 'Fleisch & Wurst',
          color: {
            text: 'text-pink-800',
            bg: 'bg-pink-200',
            border: 'border-pink-400',
            hover: 'hover:bg-pink-300',
          },
          order: 2,
        },
        {
          name: 'Milchprodukte',
          color: {
            text: 'text-blue-800',
            bg: 'bg-blue-200',
            border: 'border-blue-400',
            hover: 'hover:bg-blue-300',
          },
          order: 3,
        },
        {
          name: 'Getränke',
          color: {
            text: 'text-purple-800',
            bg: 'bg-purple-200',
            border: 'border-purple-400',
            hover: 'hover:bg-purple-300',
          },
          order: 4,
        },
        {
          name: 'Tiefkühl',
          color: {
            text: 'text-cyan-800',
            bg: 'bg-cyan-200',
            border: 'border-cyan-400',
            hover: 'hover:bg-cyan-300',
          },
          order: 5,
        },
        {
          name: 'Backwaren',
          color: {
            text: 'text-yellow-800',
            bg: 'bg-yellow-200',
            border: 'border-yellow-400',
            hover: 'hover:bg-yellow-300',
          },
          order: 6,
        },
        {
          name: 'Aktion',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 7,
        },
        {
          name: 'Ernährung',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 8,
        },
        {
          name: 'Beauty',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 9,
        },
        {
          name: 'Baby & Kind',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 10,
        },
        {
          name: 'Haushalt',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 11,
        },
        {
          name: 'Körperpflege',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 12,
        },
        {
          name: 'Tier',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 13,
        },
        {
          name: 'Foto & Technik',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 14,
        },
        {
          name: 'Licht & Elektro',
          color: {
            text: 'text-yellow-800',
            bg: 'bg-yellow-200',
            border: 'border-yellow-400',
            hover: 'hover:bg-yellow-300',
          },
          order: 15,
        },
        {
          name: 'Werkzeug & Maschinen',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 16,
        },
        {
          name: 'Sanitär',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 17,
        },
        {
          name: 'Garten',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 18,
        },
        {
          name: 'Sicherheit',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 19,
        },
        {
          name: 'Holz',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 20,
        },
        {
          name: 'Bauen & Renovieren',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 21,
        },
        {
          name: 'Auto',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 22,
        },
        {
          name: 'Fahrrad',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 23,
        },
        {
          name: 'Möbel',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 24,
        },
        {
          name: 'Küche',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 25,
        },
        {
          name: 'Kleinaufbewahrung & Organisation',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 26,
        },
        {
          name: 'Bad',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 27,
        },
        {
          name: 'Betten & Matratzen',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 28,
        },
        {
          name: 'Deko',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 29,
        },
        {
          name: 'Outdoor',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 30,
        },
        {
          name: 'Pflanzen',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 31,
        },
        {
          name: 'Sofas & Sessel',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 32,
        },
        {
          name: 'Speisen & Getränke',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 33,
        },
        {
          name: 'Tisch & Stühle',
          color: {
            text: 'text-orange-800',
            bg: 'bg-orange-200',
            border: 'border-orange-400',
            hover: 'hover:bg-orange-300',
          },
          order: 34,
        },
      ],
    }
  },
  actions: {
    addCategory(name: string, color: { text: string; bg: string; border: string; hover: string }) {
      this.categories.push({ name, color, order: this.categories.length + 1 })
    },
    removeCategory(name: string) {
      this.categories = this.categories.filter((category) => category.name !== name)
    },
  },
  getters: {
    getCategoryByName: (state) => {
      return (name: string) => state.categories.find((category) => category.name === name)
    },
  },
})
