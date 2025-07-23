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
            text: 'text-amber-800',
            bg: 'bg-amber-200',
            border: 'border-amber-400',
            hover: 'hover:bg-amber-300',
          },
          order: 8,
        },
        {
          name: 'Beauty',
          color: {
            text: 'text-pink-800',
            bg: 'bg-pink-200',
            border: 'border-pink-400',
            hover: 'hover:bg-pink-300',
          },
          order: 9,
        },
        {
          name: 'Baby & Kind',
          color: {
            text: 'text-cyan-800',
            bg: 'bg-cyan-200',
            border: 'border-cyan-400',
            hover: 'hover:bg-cyan-300',
          },
          order: 10,
        },
        {
          name: 'Haushalt',
          color: {
            text: 'text-slate-800',
            bg: 'bg-slate-200',
            border: 'border-slate-400',
            hover: 'hover:bg-slate-300',
          },
          order: 11,
        },
        {
          name: 'Körperpflege',
          color: {
            text: 'text-sky-800',
            bg: 'bg-sky-200',
            border: 'border-sky-400',
            hover: 'hover:bg-sky-300',
          },
          order: 12,
        },
        {
          name: 'Tier',
          color: {
            text: 'text-red-800',
            bg: 'bg-red-200',
            border: 'border-red-400',
            hover: 'hover:bg-red-300',
          },
          order: 13,
        },
        {
          name: 'Foto & Technik',
          color: {
            text: 'text-zinc-800',
            bg: 'bg-zinc-200',
            border: 'border-zinc-400',
            hover: 'hover:bg-zinc-300',
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
            text: 'text-stone-800',
            bg: 'bg-stone-200',
            border: 'border-stone-400',
            hover: 'hover:bg-stone-300',
          },
          order: 16,
        },
        {
          name: 'Sanitär',
          color: {
            text: 'text-rose-800',
            bg: 'bg-rose-200',
            border: 'border-rose-400',
            hover: 'hover:bg-rose-300',
          },
          order: 17,
        },
        {
          name: 'Garten',
          color: {
            text: 'text-lime-800',
            bg: 'bg-lime-200',
            border: 'border-lime-400',
            hover: 'hover:bg-lime-300',
          },
          order: 18,
        },
        {
          name: 'Sicherheit',
          color: {
            text: 'text-neutral-800',
            bg: 'bg-neutral-200',
            border: 'border-neutral-400',
            hover: 'hover:bg-neutral-300',
          },
          order: 19,
        },
        {
          name: 'Holz',
          color: {
            text: 'text-amber-800',
            bg: 'bg-amber-200',
            border: 'border-amber-400',
            hover: 'hover:bg-amber-300',
          },
          order: 20,
        },
        {
          name: 'Bauen & Renovieren',
          color: {
            text: 'text-teal-800',
            bg: 'bg-teal-200',
            border: 'border-teal-400',
            hover: 'hover:bg-teal-300',
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
            text: 'text-emerald-800',
            bg: 'bg-emerald-200',
            border: 'border-emerald-400',
            hover: 'hover:bg-emerald-300',
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
            text: 'text-purple-800',
            bg: 'bg-purple-200',
            border: 'border-purple-400',
            hover: 'hover:bg-purple-300',
          },
          order: 25,
        },
        {
          name: 'Kleinaufbewahrung & Organisation',
          color: {
            text: 'text-slate-800',
            bg: 'bg-slate-200',
            border: 'border-slate-400',
            hover: 'hover:bg-slate-300',
          },
          order: 26,
        },
        {
          name: 'Bad',
          color: {
            text: 'text-blue-800',
            bg: 'bg-blue-200',
            border: 'border-blue-400',
            hover: 'hover:bg-blue-300',
          },
          order: 27,
        },
        {
          name: 'Betten & Matratzen',
          color: {
            text: 'text-stone-800',
            bg: 'bg-stone-200',
            border: 'border-stone-400',
            hover: 'hover:bg-stone-300',
          },
          order: 28,
        },
        {
          name: 'Deko',
          color: {
            text: 'text-violet-800',
            bg: 'bg-violet-200',
            border: 'border-violet-400',
            hover: 'hover:bg-violet-300',
          },
          order: 29,
        },
        {
          name: 'Outdoor',
          color: {
            text: 'text-sky-800',
            bg: 'bg-sky-200',
            border: 'border-sky-400',
            hover: 'hover:bg-sky-300',
          },
          order: 30,
        },
        {
          name: 'Pflanzen',
          color: {
            text: 'text-green-800',
            bg: 'bg-green-200',
            border: 'border-green-400',
            hover: 'hover:bg-green-300',
          },
          order: 31,
        },
        {
          name: 'Sofas & Sessel',
          color: {
            text: 'text-neutral-800',
            bg: 'bg-neutral-200',
            border: 'border-neutral-400',
            hover: 'hover:bg-neutral-300',
          },
          order: 32,
        },
        {
          name: 'Speisen & Getränke',
          color: {
            text: 'text-lime-800',
            bg: 'bg-lime-200',
            border: 'border-lime-400',
            hover: 'hover:bg-lime-300',
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
