import {defineStore} from "pinia"

export const useProductsStore = defineStore('productsStore', {
    state: () => ({
        selectedCategory: 1,
        services: [],
        increase: false,
        activatedScroll: false,
    }),
    getters: {
        getSelectedCategory() {
            return this.selectedCategory
        }

    },
    actions: {
        setActiveCategory(id) {
            this.selectedCategory = id
        }
    }
})