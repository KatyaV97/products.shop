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
      <div class="catalog-container">
        <div class="catalog-block">
          <div class="left-side">
            <div class="sort-price">
              <p class="_non-space title">Цена</p>
              <Slider
                  :min="0"
                  :max="12000"
              />
              <div class="filter-interval">
                <p class="_non-space filter-btn">Фильтровать</p>
              </div>
            </div>
            <div class="line"></div>
            <div class="categories-title">
              <p class="_non-space title">КАТЕГОРИИ ТОВАРОВ</p>
              <div class="categories"
                   v-if="categories && categories.length > 0"
              >
                <template
                    v-for="c in categories"
                    :key="c"
                >

                  <p class="_non-space category"
                     :class="{
                    '_active': c.isActive
                     }"
                     @click="setActiveCategory(c)"
                  >{{ c.title }}</p>
                </template>
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="right-side">
            <div class="sort-block"
                 @click="tooltip.show = !tooltip.show"
            >
              <p class="_non-space">{{ activeSortTab.title }}</p>
              <Tooltip-sort
                  :sort-info="sortTabs"
                  :show="tooltip.show"
                  @changeSort="changeSortTab"
              />
            </div>
            <div class="products-list-block">
              <template
                  v-for="product in products"
                  :key="product.title"
              >
                <ProductCard
                    :card-info="product"
                />
              </template>
            </div>
            <div class="more-block">
              <p class="_non-space">Ещё</p>
              <svg width="32"
                   height="32"
                   viewBox="0 0 32 32"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 32L2.14359 8L29.8564 8L16 32Z" fill="#FFD600"/>
                <path d="M16 24L5.60769 6L26.3923 6L16 24Z" fill="#1D1D1D"/>
              </svg>

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
import {useProductsStore} from "~/store/productsStore"

export default {
  data() {
    return {
      pageTitle: 'Night store' as string,
      tooltip: {
        show: false
      },
      sortTabs: [
        {
          type: 1,
          title: 'Цены: по возрастанию'
        },
        {
          type: 2,
          title: 'Цены: по убыванию'
        }
        , {
          type: 3,
          title: 'По полуярности'
        }
      ],
      activeSortTab: {
        type: 1,
        title: 'Цены: по возрастанию'
      },
      /*products: [
        /!*  {
            id: 1,
            title: 'Наклейка на авто, JDM slap sticker, Kanjo loop one',
            price: '350.00',
            urlImg: "src/public/Aroma.png"
          },
          {
            id: 2,
            title: 'Петля буксировочная OMP style чёрная',
            price: '450.00',
            urlImg: "src/public/Aroma.png"
          },
          {
            id: 3,
            title: 'Рамка для номера “JDM”',
            price: '240.00',
            urlImg: "src/public/Aroma.png"
          }*!/
      ]*/
    }
  },
  async setup() {
    const productsStore = useProductsStore()
    const [{data: responseCategories}, {data: responseProducts}] = await Promise.all(
        [useFetch('/api/catalog/getCategories'),
          useFetch('/api/catalog/getProducts',
              {
                query: {
                  category_id: productsStore.selectedCategory,
                }
              })])
    console.log(responseProducts)
    const categories = responseCategories.value
    const products = responseProducts.value
    return {
      productsStore,
      categories,
      products
    }
  },
  computed: {
    selectedCategory() {
      return this.productsStore.selectedCategory
    }
  },
  mounted() {
    console.log(this.selectedCategory)
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach(category => {
        category.isActive = category.id === this.selectedCategory
      })
    }

    //this.initProducts()
  },
  methods: {
    changeSortTab(tab: object): void {
      this.activeSortTab = tab
      this.tooltip.show = false
    },
    setActiveCategory(category) {
      this.categories.forEach(currentCategory => {
        currentCategory.isActive = currentCategory.id === category.id
      })
    },
    async initProducts() {
 /*     console.log(111)
      const {data: responseCategories} = await useFetch('/api/catalog/getProducts',
          {
            query: {
              category_id: this.selectedCategory,
            }
          }
      )
      console.log(responseCategories)
      this.products = responseCategories.value
      console.log(this.products)*/
    }
  }
}
</script>

<style scoped>
</style>