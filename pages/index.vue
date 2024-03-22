<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>
  <MainContainer
      :has-img="true"
  >
    <template v-slot:header>
      <Header/>
    </template>
    <template v-slot:main-content>
      <div class="main-page">
        <div class="popular-categories">
          <div class="header-text"><p class="_non-space">
            Популярные категории
          </p></div>
          <div class=card-container>
            <template
                v-for="card in popularCards"
                :key="card.title"
            >
              <PopularCard
                  :card-info="card"
              />
            </template>
          </div>
        </div>
        <div class="popular-products">
          <div class="header-text"><p class="_non-space">
            Популярные товары
          </p></div>
          <div class=card-container>
            <p class="_non-space popular-text">Популярное</p>
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
import PopularProducts from "~/components/PopularProducts.vue";

export default {
  components: {PopularProducts},
  data() {
    return {
      pageTitle: 'Night store. Главная' as string,
      popularCards: [
        {
          title: 'Ароматизаторы',
          urlImg: "src/public/Aroma.png"
        },
        {
          title: 'Банки',
          urlImg: "src/public/Aroma.png"
        },
        {
          title: 'Петли',
          urlImg: "src/public/Aroma.png"
        }
      ],
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
  }
}
</script>

<style scoped>
</style>