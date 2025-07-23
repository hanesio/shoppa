import { categories } from '@vueuse/core/metadata.mjs'
import { defineStore } from 'pinia'

export interface ShopType {
  name: string
  categories: string[]
}

interface CategoryState {
  shopTypes: ShopType[]
}

export const useShopTypeStore = defineStore('types', {
  state: (): CategoryState => {
    return {
      shopTypes: [
        {
          name: 'Supermarkt',
          categories: [
            'Sonstiges',
            'Obst & Gemüse',
            'Fleisch & Wurst',
            'Milchprodukte',
            'Getränke',
            'Tiefkühl',
            'Backwaren',
            'Aktion',
          ],
        },
        {
          name: 'Drogerie',
          categories: [
            'Sonstiges',
            'Ernährung',
            'Beauty',
            'Baby & Kind',
            'Haushalt',
            'Körperpflege',
            'Tier',
            'Foto & Technik',
          ],
        },
        {
          name: 'Apotheke',
          categories: [],
        },
        {
          name: 'Bäckerei',
          categories: [],
        },
        {
          name: 'Baumarkt',
          categories: [
            'Werkzeug & Maschinen',
            'Licht & Elektro',
            'Sanitär',
            'Garten',
            'Sicherheit',
            'Holz',
            'Bauen & Renovieren',
            'Auto',
            'Fahrrad',
          ],
        },
        {
          name: 'Möbelhaus',
          categories: [
            'Möbel',
            'Küche',
            'Kleinaufbewahrung & Organisation',
            'Licht & Elektro',
            'Baby & Kind',
            'Bad',
            'Betten & Matratzen',
            'Dekoration',
            'Outdoor',
            'Pflanzen',
            'Sofas & Sessel',
            'Speisen & Getränke',
            'Tische & Stühle',
          ],
        },
      ],
    }
  },
  actions: {},
  getters: {
    getCategoriesByType: (state) => {
      return (name: string) => state.shopTypes.find((type) => type.name === name)?.categories
    },
  },
})
