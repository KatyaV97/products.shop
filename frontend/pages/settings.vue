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
      <div class="settings-container">
        <div class="settings-block">
          <div class="left-side">
            <div class="avatar-block">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="100" height="100" fill="url(#pattern0)"/>
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_419_41" transform="scale(0.00666667)"/>
                  </pattern>
                  <image id="image0_419_41" width="150" height="150"
                         xlink:href="data:image/png;base64,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"/>
                </defs>
              </svg>
              <p class="_non-space avatar-title">{{ userName }}</p>
            </div>
            <div class="favorites">
              <NuxtLink
                  to="/favorites"
                  class="custom-link"
              >
                <p class="_non-space">Ваш список избранного</p>
              </NuxtLink>
            </div>
            <div class="basket">
              <NuxtLink
                  to="/basket"
                  class="custom-link"
              >
                <p class="_non-space">Ваша корзина</p>
              </NuxtLink>
            </div>
            <MainButton
                :classes="['main', 'for-auth']"
                @click="logOut"
            >
              <p class="_non-space">Выйти из аккаунта</p>
            </MainButton>
          </div>
          <div class="right-side">
            <p class="_non-space main-text">Добро пожаловать, {{ userName }}</p>
            <p class="_non-space main-text">На главной страницы магазина вы можете посмотреть наш каталог и популярные
              товары, мы
              верим, что вы найдете желаемый товар.<br>
              Приятных покупок!</p>
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
import {useAuthUserStore} from "~/store/authUserStore";

export default {
  data() {
    return {
      pageTitle: 'Night store. Настройки' as string,
      userName: ''
    }
  },
  setup() {
    const authUserStore = useAuthUserStore()
    return {
      authUserStore
    }
  },
  async mounted() {
    if (!this.authUserStore.userName &&
        !this.authUserStore.getUserName) {
      console.log(this.authUserStore.userName)
      await navigateTo('/auth', {
        external: true
      })
    }
    this.userName = this.authUserStore.getUserName
  },
  methods: {
    logOut() {
      this.authUserStore.logOut
      navigateTo('/auth', {
        external: true
      })
    }
  }

}
</script>


<style scoped>
</style>