import {defineStore} from "pinia"

export const useProductsStore = defineStore('productsStore', {
    state: () => ({
        selectedCategory: 1,
        services: [],
        increase: false,
        activatedScroll: false,
        productsInBasket: [],
        productsInFavorite: [],
        productsSearch: []
    }),
    getters: {
        getSelectedCategory() {
            return this.selectedCategory
        },
        getProductsInBasket() {
            return this.productsInBasket
        },

        getProductsInFavorite() {
            return this.productsInFavorite
        },

        getProductsBasketCount() {
            return this.productsInBasket.reduce((acc, product) => {
                return acc + product.count
            }, 0)
        },

        getResultPrice() {
            return this.productsInBasket.reduce((acc, product) => {
                return acc + (product.count * product.price)
            }, 0)
        },

        getProductsSearch() {
            return this.productsSearch
        }
    },
    actions: {
        setActiveCategory(id) {
            this.selectedCategory = id
        },

        deleteProductFromBasket(selectedProduct) {
            if (this.productsInBasket && this.productsInBasket.length > 0) {
                const index = this.productsInBasket.findIndex(product => {
                    return product.id === selectedProduct.id
                })
                if (index !== -1) {
                    this.productsInBasket.splice(index, 1)
                }
            }
        },

        addProductsInBasket(selectedProduct, count) {
            if (count === 0) {
                this.deleteProductFromBasket(selectedProduct)
                return
            }
            if (this.productsInBasket && this.productsInBasket.length > 0) {
                const index = this.productsInBasket.findIndex(product => {
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

        addProductsInFavorite(selectedProduct) {
            this.productsInFavorite.push(selectedProduct)
        },

        deleteProductFromFavorite(selectedProduct) {
            if (this.productsInFavorite && this.productsInFavorite.length > 0) {
                const index = this.productsInFavorite.findIndex(product => {
                    return product.id === selectedProduct.id
                })
                if (index !== -1) {
                    this.productsInFavorite.splice(index, 1)

                }
            }
        },

        setProductsSearch(value) {
            this.productsSearch = value
        },

        async saveProductFromBasket(product) {
            localStorage.setItem('basket ' + product.id + ' ' + product.title, JSON.stringify(product))

            if (typeof this.getCookie('userId') !== 'undefined') {
                const {data: response} = await useFetch('/api/basket/addProduct', {
                    query: {
                        product_id: product.id,
                        count: product.count
                    }
                })
                console.log(response)
            }
        },
        async saveProductFromFavorite(product) {
            localStorage.setItem('favorite ' + product.id + ' ' + product.title, JSON.stringify(product))

            if (typeof this.getCookie('userId') !== 'undefined') {
                const {data: response} = await useFetch('/api/favorites/addProduct', {
                    product_id: product.id
                })
            }
        },
        async deleteProductFromBasketInStore(product) {
            if (localStorage.getItem('basket ' + product.id + ' ' + product.title) !== null) {
                localStorage.removeItem('basket ' + product.id + ' ' + product.title)
            }
            console.log(111)
            if (typeof this.getCookie('userId') !== 'undefined') {
                const {data: response} = await useFetch('/api/basket/deleteProduct', {
                    query: {
                        product_id: product.id,
                        count: product.count
                    }
                })
                console.log(response)
            }
        },
        async deleteProductFromFavoriteInStore(product) {
            if (localStorage.getItem('favorite ' + product.id + ' ' + product.title) !== null) {
                localStorage.removeItem('favorite ' + product.id + ' ' + product.title)
            }
            if (typeof this.getCookie('userId') !== 'undefined') {
                const {data: response} = await useFetch('/api/favorites/deleteProduct', {
                    query: {
                        product_id: product.id
                    }
                })
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop().split(';').shift()
        },
        clearBasket() {
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
        async initFromStore() {
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
                }
                const product = JSON.parse(localStorage.getItem(key))
                if (key.includes('basket')) {
                    if (!this.productsInBasket.find(item => item.id === product.id)) {
                        this.productsInBasket.push(product)
                    }
                }
                /* if (key.includes('favorite')) {
                     if (!this.productsInFavorite.find(item => item.id === product.id)) {
                         this.productsInFavorite.push(product)
                     }
                 }*/
            }
        },

        async initFromDB() {
            if (typeof this.getCookie('userId') !== 'undefined') {
                const [{data: basketProducts}/*, {data: favoriteProducts}*/] = await Promise.all([
                    useFetch('api/basket/getProducts')/*, useFetch('/api/favorites/getFavorites')*/])

                const basketProductsFromBD = basketProducts.value
                //const favoriteProductsFromBD = favoriteProducts.value
                console.log(basketProductsFromBD)
                if (basketProductsFromBD && basketProductsFromBD.length > 0) {
                        basketProductsFromBD.forEach(product => {
                        if (!this.productsInBasket.find(item => item.id === product.id)) {
                            this.productsInBasket.push({
                                ...product,
                                count: product.quantity
                            })
                        }
                    })
                }
                console.log(this.productsInBasket)
                /*if (favoriteProductsFromBD && favoriteProductsFromBD.length > 0) {
                    favoriteProductsFromBD.forEach(product => {
                        if (!this.productsInFavorite.find(item => item.id === product.id)) {
                            this.productsInFavorite.push(product)
                        }
                    })
                }*/
            }
        }
        ,

        async initSearch(placeholder) {
            const {data} = await useFetch('/api/catalog/getSearchValue', {
                    query: placeholder
                }
            )
            this.productsSearch = data.value
        }
    }
})