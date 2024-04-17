<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <Alert
      @focus="getAlertFocusStatus"
      :show="alert.visible"
      :value="alert.text"
  />

  <MainContainer
      :has-img="false"
  >
    <template v-slot:header>
      <Header/>
    </template>
    <template v-slot:main-content>
      <div class="basket-container">
        <div class="basket-block"
             v-if="productsInBasket && productsInBasket.length > 0"
        >
          <p class="_non-space title">
            Ваша корзина покупок
          </p>
          <div class="table-header">
            <p class="_non-space empty header-item"/>
            <p class="_non-space name header-item">
              Наименование
            </p>
            <p class="_non-space count header-item">
              Количество
            </p>
            <p class="_non-space price header-item">
              Цена
            </p>
          </div>
          <div class="line"/>
          <div class="basket-products">
            <template
                v-for="product in productsInBasket"
                :key="product.title"
            >
              <BasketProductCard
                  :card-info="product"
                  @increase="increase"
                  @decrease="decrease"
              />
              <div class="line"></div>
            </template>
          </div>
          <div class="request-block">
            <div class="inputs-block">
              <div class="top-input">
                <input
                    class="main-input"
                    :placeholder="'Имя пользователя'"
                    :value="userInput.name"
                    @input="setValue('name', $event.target.value)"
                />
              </div>
              <input
                  class="main-input"
                  :placeholder="'Email'"
                  :value="userInput.email"
                  @input="setValue('email', $event.target.value)"
              />
              <label
                  v-if="error.visible"
                  for="main-input"
                  class="error">
                Некорректный адрес электронной почты
              </label>
              <input
                  class="main-input"
                  :placeholder="'Номер телефона'"
                  :value="userInput.phoneNumber"
                  v-maska data-maska="+7 ### ### ####"
                  @input="setValue('phoneNumber', $event.target.value)"
              />
            </div>
            <div class="info-block">
              Пожалуйста, внесите свои данные, чтобы мы могли связаться с вами и принять вашу
              заявку
            </div>
            <div class="result-block">
              <div class="result">
                <p class="_non-space text-center">
                  Итого:
                </p>
                <p class="_non-space text-center result-text">
                  {{ new Intl.NumberFormat('ru-RU').format(resultPrice) }}
                </p>
              </div>
              <div class="result">
                <p class="_non-space delivery">Доставка:</p>
                <p class="_non-space delivery">Бесплатно</p>
              </div>
              <MainButton
                  :classes="['main', 'for-auth']"
                  :disabled="!userInput.isValid"
                  @click="sendIssue"
              >
                Оставить заявку
              </MainButton>
            </div>
          </div>
        </div>
        <div class="basket-block"
             v-else
        >
          <p class="_non-space title">
            Ваша корзина пуста
          </p>
          <div class="empty-block">
            <p class="_non-space empty">
              Пусто!
            </p>
            <NuxtLink
                to="/products"
                class="custom-link button-link"
            >
              Перейти в каталог
            </NuxtLink>
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
import type {Product} from "~/types/products"
import type {Input} from "~/types/common"
import type {Alert} from "~/types/triggers"

export default {
  data() {
    return {
      pageTitle: 'Night store. Корзина' as string,
      userInput: {
        name: '',
        phoneNumber: '',
        email: '',
        isValid: false
      } as Input,
      alert: {
        text: '',
        visible: false,
        focus: false,
        stoped: false,
      } as Alert,
      error: {
        visible: false
      } as {
        visible: boolean
      }
    }
  },
  setup() {
    const productsStore = useProductsStore()
    return {
      productsStore
    }
  },
  computed: {
    productsInBasket(): Product[] {
      return this.productsStore.getProductsInBasket
    },
    resultPrice(): number {
      return this.productsStore.getResultPrice
    }
  },
  mounted() {
    this.productsStore.initFromStore()
    this.productsStore.initFromDB()
  },
  methods: {
    getAlertFocusStatus(status: boolean): boolean {
      return this.alert.focus = status
    },
    decrease(cardInfo: Product): void {
      if (cardInfo.cardInfo.count === 1) {
        this.productsStore.deleteProductFromBasket(cardInfo.cardInfo)
        this.productsStore.deleteProductFromBasketInStore(cardInfo.cardInfo)
        return
      }
      this.productsStore.addProductsInBasket(cardInfo.cardInfo, -1)
      this.productsStore.saveProductFromBasket({...cardInfo.cardInfo, count: -1})
    },
    increase(cardInfo: Product): void {
      this.productsStore.addProductsInBasket(cardInfo.cardInfo, 1)
      this.productsStore.saveProductFromBasket({...cardInfo.cardInfo, count: 1})
    },
    setValue(key: string, value: string): void {
      if (key === 'phoneNumber' && value.length > 16) return

      this.userInput[key] = value
      this.userInput.isValid = this.validateEmail(this.userInput.email) &&
          this.userInput.name.length > 0 &&
          this.validatePhoneNumber(this.userInput.phoneNumber)
    },
    validateEmail(email: string): boolean {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    validatePhoneNumber(phoneNumber: string): boolean {
      const phone = phoneNumber.replaceAll(' ', '')
      return phone.length === 12
    },
    clearInput(): void {
      this.userInput.phoneNumber = ''
      this.userInput.name = ''
      this.userInput.email = ''
      this.userInput.isValid = false
    },
    async sendIssue(): Promise<void> {
      this.userInput.isValid = false
      let products = {}
      this.productsInBasket.forEach(product => {
        products = {
          ...products,
          [product.id]: product.count
        }
      })
      const response = await useFetch('api/basket/sendTask', {
        query: {
          products: products,
          name: this.userInput.name,
          phoneNumber: this.userInput.phoneNumber,
          email: this.userInput.email,
          date: this.$moment().format('YYYY-MM-DD HH:mm:ss')
        }
      })
      if (!response.data.error) {
        this.clearInput()
        this.alert.visible = true
        this.alert.text = 'Заявка отправлена. Мы с вами свяжемся'
        await this.closeAlert()
        this.productsStore.clearBasket()
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
  }
}
</script>

<style scoped>
</style>