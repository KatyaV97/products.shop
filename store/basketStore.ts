import {defineStore} from "pinia"

export const useBasketStore = defineStore('basketStore', {
    state: () => ({
        showBasket: false,
        services: [],
        increase: false,
        activatedScroll: false,
    }),
    getters: {},
    actions: {
        addServices(payload) {
            if (this.services.some(service => service.id === payload.id)) {
                return
            }
            console.log(payload)
            if (payload.isTariff) {
                let indexOldTariff = this.services.findIndex(service => {
                    return service.isTariff
                })
                if (indexOldTariff !== -1) {
                    this.toggleBasket()
                    this.services.splice(indexOldTariff, 1, payload)
                    this.showBasket = true
                    return
                }
            }
            this.toggleBasket()
            this.services.push(payload)
            this.showBasket = true
        },
        toggleBasket(): void {
            this.increase = true

            setTimeout(() => {
                this.increase = false
            }, 200)
        },
        deleteServices(payload) {
            const index = this.services.findIndex(service => {
                return service.id === payload.id
            })
            this.services.splice(index, 1)

            if (this.services.length === 0) {
                this.showBasket = false
            }
        },
        deleteAllServices() {
            this.services = []
            this.showBasket = false
        },
        setActiveTab(value: boolean): void {
            this.activatedScroll = value
        },
        async sendRequest(payload) {
            try {
                console.log(payload)
                //TODO Отправляем запрос на сервер

            } catch (e) {
                console.log(e)
            }
        }
    }
})