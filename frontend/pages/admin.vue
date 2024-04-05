<template>
  <MainContainer
      :has-img="false"
  >
    <template v-slot:header>
      <div class="header-container">
        <div class="header-block">
          <div class="left-block">
            <div class="ico">
              <img src="/night.png" alt="Логотип компании">
            </div>
          </div>
          <NuxtLink
              :to="hasLogin ? '/settings': '/auth'"
              class="custom-link"
          >
            <div class="ico-btn">
              <svg width="23"
                   height="33"
                   viewBox="0 0 23 33"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M11.25 16.0934C12.7334 16.0934 14.1834 15.6215 15.4168 14.7373C16.6501 13.8531 17.6114 12.5964 18.1791 11.126C18.7468 9.6557 18.8953 8.03778 18.6059 6.47687C18.3165 4.91596 17.6022 3.48218 16.5533 2.35683C15.5044 1.23148 14.168 0.465102 12.7132 0.154619C11.2583 -0.155865 9.75032 0.00348652 8.37988 0.612522C7.00943 1.22156 5.83809 2.25292 5.01398 3.5762C4.18987 4.89947 3.75 6.45522 3.75 8.0467C3.75199 10.1802 4.5428 12.2256 5.94889 13.7342C7.35499 15.2428 9.26149 16.0913 11.25 16.0934ZM11.25 2.68224C12.2389 2.68224 13.2056 2.99686 14.0279 3.58631C14.8501 4.17577 15.491 5.01358 15.8694 5.99381C16.2478 6.97404 16.3469 8.05265 16.1539 9.09326C15.961 10.1339 15.4848 11.0897 14.7855 11.84C14.0863 12.5902 13.1954 13.1011 12.2255 13.3081C11.2555 13.5151 10.2502 13.4088 9.33658 13.0028C8.42295 12.5968 7.64206 11.9092 7.09265 11.027C6.54325 10.1449 6.25 9.10769 6.25 8.0467C6.25 6.62396 6.77678 5.25948 7.71447 4.25345C8.65215 3.24742 9.92392 2.68224 11.25 2.68224Z"
                    fill="#FFD600"/>
                <path
                    d="M11.25 18.7754C8.26733 18.7789 5.40777 20.0517 3.2987 22.3145C1.18964 24.5774 0.00330857 27.6454 0 30.8454C0 31.2011 0.131696 31.5422 0.366117 31.7938C0.600537 32.0453 0.91848 32.1866 1.25 32.1866C1.58152 32.1866 1.89946 32.0453 2.13388 31.7938C2.3683 31.5422 2.5 31.2011 2.5 30.8454C2.5 28.3556 3.42187 25.9678 5.06282 24.2073C6.70376 22.4467 8.92936 21.4576 11.25 21.4576C13.5706 21.4576 15.7962 22.4467 17.4372 24.2073C19.0781 25.9678 20 28.3556 20 30.8454C20 31.2011 20.1317 31.5422 20.3661 31.7938C20.6005 32.0453 20.9185 32.1866 21.25 32.1866C21.5815 32.1866 21.8995 32.0453 22.1339 31.7938C22.3683 31.5422 22.5 31.2011 22.5 30.8454C22.4967 27.6454 21.3104 24.5774 19.2013 22.3145C17.0922 20.0517 14.2327 18.7789 11.25 18.7754Z"
                    fill="#FFD600"/>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
    <template v-slot:main-content>
      <div class="favorites-container">
        <div class="favorites-block"
             v-if="orders && orders.length > 0"
        >
          <p class="_non-space title">Список заявок</p>
          <div class="favorites-products">
            <template
                v-for="(order, index) in orders"
                :key="order.id"
            >
              <TaskCard
                  :order-info="order"
                  :index="index + 1"
              />
              <div class="line"></div>
            </template>
          </div>
        </div>
        <div class="basket-block"
             v-else
        >
          <p class="_non-space title">Ваш список заявок пуст</p>
          <div class="empty-block">
            <p class="_non-space empty">Пусто!</p>
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
import {useProductsStore} from "~/store/productsStore";
import {useAuthUserStore} from "~/store/authUserStore";

export default {
  data() {
    return {}
  },
  async setup() {
    const productsStore = useProductsStore()
    const authUserStore = useAuthUserStore()

    const route = useRoute()
    const hasLogin = route.params.own
    const {data: orders} = await useFetch('/api/admin/getOrders')
    console.log(orders)
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
    checkAuth() {
      if (this.userId !== null && this.userId !== undefined &&
          this.userId !== '') {
        this.hasLogin = true
        return
      }
      this.hasLogin = false
    },
  }
}
</script>

<style scoped>

</style>