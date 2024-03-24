<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <MainContainer
      :has-img="false"
  >
    <template v-slot:header>
      <Header/>
    </template>
    <template v-slot:main-content>
      <div class="basket-container">
        <div class="basket-block"
             v-if="products && products.length > 0"
        >
          <p class="_non-space title">Ваша корзина покупок</p>
          <div class="table-header">
            <p class="_non-space empty header-item"></p>
            <p class="_non-space name header-item">Наименование</p>
            <p class="_non-space count header-item">Количество</p>
            <p class="_non-space price header-item">Цена</p>
          </div>
          <div class="line"></div>
          <div class="basket-products">
            <template
                v-for="product in products"
                :key="product.title"
            >
              <BasketProductCard
                  :card-info="product"
              />
              <div class="line"></div>
            </template>
          </div>
          <div class="request-block">
            <div class="inputs-block">
              <div class="top-input">
                <label
                    v-if="!userInput.isValid"
                    for="main-input"
                    class="error">
                  Некорректный адрес электронной почты
                </label>
                <input
                    class="main-input"
                    :placeholder="'Имя пользователя'"
                    :value="userInput.name"
                />
              </div>
              <input
                  class="main-input"
                  :placeholder="'Email'"
                  :value="userInput.email"
              />
              <input
                  class="main-input"
                  :placeholder="'Password'"
                  :value="userInput.password"
              />
            </div>
            <div class="info-block">Пожалуйста, внесите свои данные, чтобы мы могли связаться с вами и принять вашу
              заявку
            </div>
            <div class="result-block">
              <div class="result">
                <p class="_non-space text-center">Итого:</p>
                <p class="_non-space text-center result-text">{{ new Intl.NumberFormat('ru-RU').format(result) }}</p>
              </div>
              <div class="result">
                <p class="_non-space delivery">Доставка:</p>
                <p class="_non-space delivery">Бесплатно</p>
              </div>
              <MainButton
                  :classes="['main', 'for-auth']"
              >
                Оставить заявку
              </MainButton>
            </div>
          </div>
        </div>
        <div class="basket-block"
             v-else
        >
          <p class="_non-space title">Ваша корзина пуста</p>
          <div class="empty-block">
            <p class="_non-space empty">Пусто!</p>
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
export default {
  data() {
    return {
      pageTitle: 'Night store. Корзина' as string,
      userInput: {
        name: '',
        password: '',
        email: '',
        isValid: true
      },
      result: '1000' as string
    }
  },
  setup() {
    const products = ref([
      /*{
        title: 'Товар 1',
        price: 1000,
        count: 1,
      },
      {
        title: 'Товар 2',
        price: 2000,
        count: 2,
      },
      {
        title: 'Товар 3',
        price: 3000,
        count: 3,
      },*/
    ])
    return {
      products
    }
  }

}
</script>

<style scoped>
</style>