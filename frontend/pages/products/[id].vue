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
      <div class="selected-product-container">
        <div class="selected-product-block">
          <div class="left-side">
            <img :src="cardInfo.imgUrl" alt="Картинка товара"/>
          </div>
          <div class="right-side">
            <div class="top">
              <p class="_non-space title">{{ product.title }}</p>
              <div class="description">
                <p class="_non-space title">Описание:</p>
                <p class="_non-space description">{{ product.description }}</p>
              </div>
            </div>
            <div class="bottom">
              <div class="buy-block">
                <div class="toggle-block">
                  <div
                      class="toggle"
                      @click="decrease"
                  >-
                  </div>
                  <input
                      class="main-input"
                      type="number"
                      :value="count.toString()"
                      :max="100"
                      :min="1"
                  />
                  <div
                      class="toggle"
                      @click="increase"
                  >+
                  </div>
                </div>
                <MainButton
                    :classes="['main', 'big']"
                >
                  Купить
                </MainButton>
                <div
                    v-if="product.isFavorite"
                    @click="toggleHeart"
                >
                  <svg
                      class="heart"
                      fill="#ff0000"
                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path> </g></svg>
                </div>
                <div
                    v-else
                    @click="toggleHeart"
                >
                  <svg
                      class="heart"
                      fill="#ffdd00"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffdd00"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                          d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <p class="_non-space price">Цена: {{ resultPrice }}
                <span class="_non-space rouble">№</span>
              </p>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="popular-products">
          <div class=card-container>
            <p class="_non-space popular-text">Рекомендуем:</p>
            <template
                v-for="card in popularProducts"
                :key="card.title"
            >
              <PopularProducts
                  :card-info="card"
              />
            </template>
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
      pageTitle: 'Night store' as string,
      count: 1 as number,
      resultPrice: 0 as number,
      popularProducts: [
        {
          title: 'Наклейка на авто, JDM slap sticker, Kanjo loop one',
          price: '350.00',
          urlImg: "src/public/Aroma.png"
        },
        {
          title: 'Петля буксировочная OMP style чёрная',
          price: '450.00',
          urlImg: "src/public/Aroma.png"
        },
        {
          title: 'Рамка для номера “JDM”',
          price: '240.00',
          urlImg: "src/public/Aroma.png"
        }
      ]
    }
  },
  setup() {
    const route = useRoute()
    console.log(route.params.id)

    let product = ref({
      id: 1,
      isFavorite: false,
      title: 'Наклейка на авто, JDM slap sticker, Kanjo loop one',
      price: '350.00',
      urlImg: "src/public/Aroma.png",
      description: 'Ароматизатор автомобильный на зеркало заднего вида JDM с запахом Чёрный лёд. Вам хочется окружить себя самым свежим и бодрящим ароматом? Тогда ароматизатор "Чёрный лёд" создан именно для вас. В его основе - ультрахолодные нотки льда, которые пробуждают душу и сознание, настраивая на рабочий лад.'
    })
    return {product}
  },
  methods: {
    toggleHeart() {
      this.product.isFavorite = !this.product.isFavorite
    },
    decrease(): void {
      const result = this.count - 1
      if (result === 0) return
      this.count -= 1
    },
    increase(): void {
      const result = this.count + 1
      if (result === 101) return
      this.count += 1
    }

  }
}
</script>


<style scoped>
& input[type=number]::-webkit-inner-spin-button,
& input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

& input[type=number] {
  -moz-appearance: textfield;
}
</style>