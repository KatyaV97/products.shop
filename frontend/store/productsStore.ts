import {defineStore} from "pinia"

type Product = {
    id: number,
    title: string,
    count: number,
    quantity?: number,
    price: number,
};

export const useProductsStore = defineStore('productsStore', {
    state: () => ({
        selectedCategory: 1 as number,
        services: [] as Product[],
        increase: false as boolean,
        activatedScroll: false as boolean,
        productsInBasket: [] as Product[],
        productsInFavorite: [] as Product[],
        productsSearch: [] as Product[]
    }),
    getters: {
        getSelectedCategory(): number {
            return this.selectedCategory
        },
        getProductsInBasket(): Product[] {
            return this.productsInBasket
        },

        getProductsInFavorite(): Product[] {
            return this.productsInFavorite
        },

        getProductsBasketCount(): number {
            return this.productsInBasket.reduce((acc: number, product: Product) => {
                return acc + product.count
            }, 0)
        },

        getResultPrice(): number {
            return this.productsInBasket.reduce((acc: number, product: Product) => {
                return acc + (product.count * product.price)
            }, 0)
        },

        getProductsSearch(): Product[] {
            return this.productsSearch
        }
    },
    actions: {
        setActiveCategory(id: number): void {
            this.selectedCategory = id
        },

        deleteProductFromBasket(selectedProduct: Product): void {
            if (this.productsInBasket && this.productsInBasket.length > 0) {
                const index: number = this.productsInBasket.findIndex((product: Product): boolean => {
                    return product.id === selectedProduct.id
                })
                if (index !== -1) {
                    this.productsInBasket.splice(index, 1)
                }
            }
        },

        addProductsInBasket(selectedProduct: Product, count: number): void {
            if (count === 0) {
                this.deleteProductFromBasket(selectedProduct)
                return
            }
            if (this.productsInBasket && this.productsInBasket.length > 0) {
                const index: number = this.productsInBasket.findIndex((product: Product): boolean => {
                    return product.id === selectedProduct.id
                })
                if (index !== -1) {
                    this.productsInBasket[index].count += count
                    return
                }
            }
            this.productsInBasket.push({
                ...selectedProduct,
                count: count
            })
        },

        addProductsInFavorite(selectedProduct: Product): void {
            this.productsInFavorite.push(selectedProduct)
        },

        deleteProductFromFavorite(selectedProduct: Product): void {
            if (this.productsInFavorite && this.productsInFavorite.length > 0) {
                const index: number = this.productsInFavorite.findIndex((product: Product): boolean => {
                    return product.id === selectedProduct.id
                })
                if (index !== -1) {
                    this.productsInFavorite.splice(index, 1)

                }
            }
        },

        setProductsSearch(value: Product[]): void {
            this.productsSearch = value
        },

        async saveProductFromBasket(product: Product): Promise<void> {
            localStorage.setItem('basket ' + product.id + ' ' + product.title, JSON.stringify(product))

            if (typeof this.getCookie('userId') !== 'undefined') {
                await useFetch('/api/basket/addProduct', {
                    query: {
                        product_id: product.id,
                        count: product.count
                    }
                })
            }
        },

        async saveAllProductsFromBasket(): Promise<void> {
            if (this.productsInBasket && this.productsInBasket.length > 0) {
                this.productsInBasket.forEach(product => {
                    useFetch('/api/basket/addProduct', {
                        query: {
                            product_id: product.id
                        }
                    })
                })
            }
        },

        async saveAllProductsFromFavorites(): Promise<void> {
            if (this.productsInFavorite && this.productsInFavorite.length > 0) {
                this.productsInFavorite.forEach((product: Product): void => {
                    useFetch('/api/favorites/addFavorite', {
                        query: {
                            product_id: product.id
                        }
                    })
                })
            }
        },

        async saveProductFromFavorite(product: Product): Promise<void> {
            localStorage.setItem('favorite ' + product.id + ' ' + product.title, JSON.stringify(product))

            if (typeof this.getCookie('userId') !== 'undefined') {
                await useFetch('/api/favorites/addFavorite', {
                    query: {
                        product_id: product.id
                    }
                })
            }
        },
        async deleteProductFromBasketInStore(product: Product): Promise<void> {
            if (localStorage.getItem('basket ' + product.id + ' ' + product.title) !== null) {
                localStorage.removeItem('basket ' + product.id + ' ' + product.title)
            }
            if (typeof this.getCookie('userId') !== 'undefined') {
                await useFetch('/api/basket/deleteProduct', {
                    query: {
                        product_id: product.id,
                        count: product.count
                    }
                })
            }
        },
        async deleteProductFromFavoriteInStore(product: Product): Promise<void> {
            if (localStorage.getItem('favorite ' + product.id + ' ' + product.title) !== null) {
                localStorage.removeItem('favorite ' + product.id + ' ' + product.title)
            }
            if (typeof this.getCookie('userId') !== 'undefined') {
                await useFetch('/api/favorites/deleteFavorite', {
                    query: {
                        product_id: product.id
                    }
                })
            }
        },
        getCookie(name: string): string | undefined {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop().split(';').shift()
        },
        clearBasket(): void {
            this.productsInBasket = []
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
                }
                const product = JSON.parse(localStorage.getItem(key))
                if (key.includes('basket')) {
                    localStorage.removeItem('basket ' + product.id + ' ' + product.title)
                }
            }
        },
        async initFromStore(): Promise<void> {
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
                }
                const product = JSON.parse(localStorage.getItem(key))
                if (key.includes('basket')) {
                    if (!this.productsInBasket.find((item: Product): boolean => item.id === product.id)) {
                        this.productsInBasket.push(product)
                    }
                }
                if (key.includes('favorite')) {
                    if (!this.productsInFavorite.find((item: Product): boolean => item.id === product.id)) {
                        this.productsInFavorite.push(product)
                    }
                }
            }
        },

        async initFromDB(): Promise<void> {
            if (typeof this.getCookie('userId') !== 'undefined') {
                const [{data: basketProducts}, {data: favoriteProducts}] = await Promise.all([
                    useFetch('api/basket/getProducts'), useFetch('/api/favorites/getFavorites')])

                const basketProductsFromBD = basketProducts.value
                const favoriteProductsFromBD = favoriteProducts.value

                if (basketProductsFromBD &&
                    Array.isArray(basketProductsFromBD) &&
                    basketProductsFromBD.length > 0) {
                    basketProductsFromBD.forEach((product: Product): void => {
                        if (!this.productsInBasket.find((item: Product): boolean => item.id === product.id)) {
                            this.productsInBasket.push({
                                ...product,
                                count: product.quantity
                            })
                            localStorage.setItem('basket ' + product.id + ' ' + product.title, JSON.stringify({
                                ...product,
                                count: product.quantity
                            }))
                        }
                    })
                }

                if (favoriteProductsFromBD &&
                    Array.isArray(favoriteProductsFromBD) &&
                    favoriteProductsFromBD.length > 0) {
                    favoriteProductsFromBD.forEach((product: Product): void => {
                        if (!this.productsInFavorite.find(item => item.id === product.id)) {
                            this.productsInFavorite.push(product)
                            localStorage.setItem('favorite ' + product.id + ' ' + product.title, JSON.stringify(product))
                        }
                    })
                }
            }
        },

        async initSearch(placeholder: string): Promise<void> {
            const {data} = await useFetch('/api/catalog/getSearchValue', {
                    query: placeholder
                }
            )

            this.setProductsSearch(data.value)
        },

        async deleteOrder(phone_number: string): Promise<void> {
            const {data} = await useFetch('/api/orders/deleteOrder', {
                query: {phone_number: phone_number}
            })
            return data.value
        }
    }
})