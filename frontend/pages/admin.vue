<template>
  <UniversalAlert
      :isError="errorAlert.show"
      :value="errorAlert.text"
      :url="errorAlert.url"
      @close-alert="toggleErrorAlert($event,'','')"
  />

  <Alert
      @focus="getAlertFocusStatus"
      :show="alert.visible"
      :value="alert.text"
  />

  <MainContainer
      :has-img="false"
  >
    <template v-slot:header>
      <div class="header-container">
        <div class="header-block">
          <div class="left-block">
            <div class="ico">
              <img
                  src="/night.png"
                  alt="Логотип компании"
              >
            </div>
          </div>
          <MainButton
              :classes="['main']"
              @click="logOut"
          >
            <p class="_non-space">
              Выйти
            </p>
          </MainButton>
        </div>
      </div>
    </template>
    <template v-slot:main-content>
      <div class="favorites-container">
        <div
            class="favorites-block"
            v-if="orders && orders.length > 0"
        >
          <p class="_non-space title">
            Список заявок
          </p>
          <div class="favorites-products">
            <template
                v-for="(order, index) in orders"
                :key="order.id"
            >
              <TaskCard
                  :order-info="order"
                  :index="index + 1"
                  @delete-order="deleteTask"
              />
            </template>
          </div>
        </div>
        <div
            class="basket-block"
            v-else
        >
          <p class="_non-space title">
            Ваш список заявок пуст
          </p>
          <div class="empty-block">
            <p class="_non-space empty">
              Пусто!
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <Footer/>
    </template>
  </MainContainer>
</template>

<script lang="ts">
import {useProductsStore} from "~/store/productsStore"
import {useAuthUserStore} from "~/store/authUserStore"
import type {Alert, ErrorAlert} from "~/types/triggers"

export default {
  data() {
    return {
      errorAlert: {
        show: false,
        text: '',
        url: ''
      } as ErrorAlert,
      alert: {
        text: '',
        visible: false,
        focus: false,
        stoped: false,
      } as Alert,
    }
  },
  async setup() {
    const productsStore = useProductsStore()
    const authUserStore = useAuthUserStore()

    const route = useRoute()
    const hasLogin = route.params.own
    const {data: orders} = await useFetch('/api/orders/getOrders')

    return {
      productsStore,
      authUserStore,
      hasLogin,
      orders
    }
  },
  computed: {
    userId() {
      const userId = useCookie('userId')
      return userId.value
    }
  },
  mounted() {
    this.checkAuth()

  },
  methods: {
    getAlertFocusStatus(status: boolean): boolean {
      return this.alert.focus = status
    },
    async deleteTask(response: object): void {
      if (!this.errorHandler(response.response)) {
        this.orders = this.orders.filter(order => order.phone_number !== response.phone_number)
        this.alert.visible = true
        this.alert.text = 'Заявка удалена'
        await this.closeAlert()
      }
    },
    async closeAlert(): Promise<void> {
      setTimeout(() => {
        if (!this.alert.focus) {
          this.alert.stoped = false
          this.alert.visible = false
          setTimeout(() => {
            this.alert.text = ''
          }, 600)
        } else {
          this.alert.stoped = true
          this.alert.visible = true
        }
      }, 5000)
    },
    checkAuth(): void {
      if (this.userId !== null && this.userId !== undefined &&
          this.userId !== '') {
        this.hasLogin = true
        return
      }
      this.hasLogin = false
    },
    logOut(): void {
      this.authUserStore.logOut()
      navigateTo('/auth', {
        external: true
      })
    },
    errorHandler(response: object): boolean {
      if (!response || response?.error && response.error) {
        this.toggleErrorAlert(true, 'Что-то пошло не так, попробуйте позже', response?.url ? response?.url : '')
        return true
      }
      return false
    },
    toggleErrorAlert(show: boolean, text: string, url: string): void {
      this.errorAlert.show = show
      this.errorAlert.text = text
      this.errorAlert.url = url
    },
  }
}
</script>

<style scoped>
</style>