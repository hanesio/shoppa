import { defineStore } from 'pinia'

interface OrderedShop {
  name: string
  order: number
}

interface ShopState {
  shops: OrderedShop[]
}

export const useShopStore = defineStore('shops', {
  state: (): ShopState => {
    return {
      shops: [
        { name: 'Supermarkt', order: 0 },
        { name: 'REWE', order: 1 },
        { name: 'ALDI', order: 2 },
        { name: 'LIDL', order: 3 },
        { name: 'DM', order: 4 },
        { name: 'Rossmann', order: 5 },
        { name: 'EDEKA', order: 6 },
      ],
    }
  },
  actions: {
    addShop(name: string) {
      const newOrder = this.shops.length + 1
      this.shops.push({ name, order: newOrder })
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
  },
})
