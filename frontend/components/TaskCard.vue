<template>
  <div class="order-table-header">
    <p class="_non-space header-item index">№</p>
    <p class="_non-space name header-item">Имя</p>
    <p class="_non-space price header-item">Телефон</p>
    <p class="_non-space price header-item">Дата</p>
    <p class="_non-space empty-2 header-item"></p>
  </div>
  <div class="table-body">
    <div class="order-card-container">
      <p class="_non-space index">{{ index }}</p>
      <p class="_non-space title">{{ orderInfo.user_name }}</p>
      <p class="_non-space price">
        {{ orderInfo.phone_number }}
      </p>
      <p class="_non-space price header-item">
        {{ formatDate(orderInfo.date) }}
      </p>
      <div class="basket-btn">
        <MainButton
            :classes="['main', 'small']"
            @click="deleteTask()"
        >
          Удалить
        </MainButton>
      </div>
    </div>
    <h3 class="_non-space list-title">Перечень продуктов:</h3>
    <div
        class="order-products"
        v-for="(product, index) in orderInfo.products"
        key="index"
    >
      <p class="_non-space product-item">
        {{ product.product_name }}
      </p>
      <p class="_non-space product-item count">
        {{ product.count }} шт.
      </p>
      <p class="_non-space product-item price">
        {{ product.product_price }} <span class="rouble">№</span>
      </p>
    </div>
    <div class="result">
      <h3 class="_non-space price-result">Итого:</h3>
      <p class="_non-space product-item price">
        {{ new Intl.NumberFormat('ru-RU').format(getResultPrice()) }} <span class="rouble">№</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {useProductsStore} from "~/store/productsStore"

export default {
  emits: ['deleteOrder'],
  props: {
    orderInfo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    const productsStore = useProductsStore()
    return {
      productsStore
    }
  },
  methods: {
    deleteTask() {
      const response = this.productsStore.deleteOrder(this.orderInfo.phone_number)
      this.$emit('deleteOrder', {response: response, phone_number: this.orderInfo.phone_number})
    },
    formatDate(date: string) {
      return this.$moment(date).format('DD.MM.YYYY')
    },
    getResultPrice() {
      return this.orderInfo.products.reduce((acc, product) => {
        return acc + product.product_price * product.count
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>