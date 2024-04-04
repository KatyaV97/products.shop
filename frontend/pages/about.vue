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
      <div class="about-container">
        <div class="postulates-block">
          <h3 class="_non-space postulates-text">Постулаты</h3>
          <div class="postulates">
            <template
                v-for="post in postulates"
                :key="post.title"
            >
              <div class="for-border">
                <div class="postulate">
                  <p class="_non-space title">{{ post.title }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="profits-block">
          <h3 class="_non-space title">Наша польза для клиента</h3>
          <div class="profits">
            <template
                v-for="(profit, index) in profits"
                :key="profit.description"
            >
              <div class="profit">
                <div class="circle-index"><p class="_non-space">{{ index + 1 }}</p></div>
                <p class="_non-space description">{{ profit.description }}</p>
              </div>
            </template>
          </div>
        </div>
        <div class="social-media-block">
          <h3 class="_non-space social-media-text">Мы в соц.сетях</h3>
          <div class="social-media">
            <div class="for-border">
              <div class="tg">
                <img src="/icon-telegram.png" alt="Иконка телеграмма"/>
              </div>
              <div class="tg">
                <img src="/icon-whatsapp.png" alt="Иконка whatsapp"/>
              </div>
              <div class="tg">
                <img src="/icon-inst.png" alt="Иконка инстаграмма"/>
              </div>
            </div>
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
      pageTitle: 'Night store. О нас' as string,
      postulates: [
        {
          title: 'Наша цель - радовать клиента  качественным сервисом'
        },
        {
          title: 'Быть надежной и амбиционной командой, любящей своих клиентов'
        },
        {
          title: 'Быть успешной и быстрорастущей командой'
        },
      ],
      profits: [
        {
          description: 'Мы стремимся стать лучшими на рынке! Ставим цель быть номером один, поэтому мы даем широкий выбор ассортимента,удобство оформления заказа, расширенную гарантию и высококачественное обслуживание'
        },
        {
          description: 'У нас справедливые цены, поэтому с нами приятно сотрудничать'
        },
        {
          description: 'Покупая продукт у нас, вы получите положительные эмоции и уважительное отношение'
        },
        {
          description: 'Мы выполняем обещания, данные своим клиентам. Мы надежный партнер! С нашей помощью и вашими пожеланиями ваша задача всегда будет решена в срок'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>