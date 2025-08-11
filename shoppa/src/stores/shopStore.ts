import { defineStore } from 'pinia'

interface OrderedShop {
  name: string
  type: string
  order: number
}

interface ShopState {
  shops: OrderedShop[]
}

export const useShopStore = defineStore('shops', {
  state: (): ShopState => {
    return {
      shops: [
        { name: 'ALDI', type: 'Supermarkt', order: 0 },
        { name: 'DM', type: 'Drogerie', order: 1 },
        { name: 'Reffeling', type: 'Bäckerei', order: 2 },
        { name: 'REWE', type: 'Supermarkt', order: 3 },
        { name: 'EDEKA', type: 'Supermarkt', order: 4 },
        { name: 'Apotheke', type: 'Apotheke', order: 5 },
        { name: 'Hagebau', type: 'Baumarkt', order: 6 },
        { name: 'IKEA', type: 'Möbelhaus', order: 7 },
        { name: 'Rossmann', type: 'Drogerie', order: 8 },
        { name: 'Netto', type: 'Supermarkt', order: 9 },
        { name: 'LIDL', type: 'Supermarkt', order: 10 },
        { name: 'Alpis Eiscafé', type: 'Eisdiele', order: 11 },
      ],
    }
  },
  actions: {
    addShop(name: string, type: string) {
      const newOrder = this.shops.length + 1
      this.shops.push({ name, type, order: newOrder })
    },
    removeShop(name: string) {
      this.shops = this.shops.filter((shop) => shop.name !== name)
    },
  },
  getters: {
    getShopByName: (state) => {
      return (name: string) => state.shops.find((shop) => shop.name === name)
    },
    getShopByOrder: (state) => {
      return (order: number) => state.shops.find((shop) => shop.order === order)
    },
    getTypeByShop: (state) => {
      return (name: string) => state.shops.find((shop) => shop.name === name)?.type
    },
  },
})
