<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <UniversalAlert
      :isError="errorAlert.show"
      :value="errorAlert.text"
      :url="errorAlert.url"
      @close-alert="toggleErrorAlert($event,'','')"
  />

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
                  @update-min-max="setMinMax"
              />
              <div class="filter-interval">
                <p
                    @click="filterProductsByPrice"
                    class="_non-space filter-btn"
                >Фильтровать</p>
              </div>
            </div>
            <div class="line "></div>
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
            <div class="products-list-block"
                 v-if="!isLoading && filteredProducts && filteredProducts.length > 0"
            >
              <template
                  v-for="product in filteredProducts"
                  :key="product.title"
              >
                <ProductCard
                    :card-info="product"
                />
              </template>
            </div>
            <div class="more-block"
                 v-if="filteredProducts && filteredProducts.length > 10"
            >
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
import type {SortTab} from "~/types/tabs"
import type {Range} from "~/types/common"
import type {ErrorAlert, Tooltip} from "~/types/triggers"
import type {Categories, Product} from "~/types/products"

export default {
  data() {
    return {
      pageTitle: 'Night store' as string,
      isLoading: true as boolean,
      priceRange: {
        min: 0,
        max: 12000
      } as Range,
      tooltip: {
        show: false
      } as Tooltip,
      sortTabs: [
        {
          type: 1,
          title: 'Цены: по возрастанию'
        },
        {
          type: 2,
          title: 'Цены: по убыванию'
        }, {
          type: 3,
          title: 'По полуярности'
        }
      ] as SortTab[],
      activeSortTab: {
        type: 1,
        title: 'Цены: по возрастанию'
      } as SortTab,
      filteredProducts: [] as Product[],
      errorAlert: {
        show: false,
        text: '',
        url: ''
      } as ErrorAlert
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

    const categories = responseCategories.value
    const products = responseProducts.value
    return {
      productsStore,
      categories,
      products
    }
  },
  computed: {
    selectedCategory(): number {
      return this.productsStore.selectedCategory
    }
  },
  mounted() {
    if (!this.errorHandler(this.categories) && this.categories && this.categories.length > 0) {
      this.categories.forEach((category: Categories) => {
        category.isActive = category.id === this.selectedCategory
      })
    }
    if (!this.errorHandler(this.products)){
      this.filterProductsByLength(10)
      this.sortProducts()
    }

    this.isLoading = false
  },
  methods: {
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
    setMinMax(range): void {
      this.priceRange.min = range.leftValue
      this.priceRange.max = range.rightValue
    },
    filterProductsByPrice(): void {
      this.filteredProducts = this.products.filter((product: Product): boolean => {
        return product.price >= this.priceRange.min && product.price <= this.priceRange.max
      })
      this.sortProducts()
    },
    filterProductsByLength(count: number): void {
      if (this.products && this.products.length > count) {
        this.filteredProducts = this.products.slice(0, count)
      } else {
        this.filteredProducts = this.products
      }
    },
    changeSortTab(tab: SortTab): void {
      this.activeSortTab = tab
      this.tooltip.show = false
      this.sortProducts()
    },
    sortProducts(): void {
      if (this.activeSortTab.type === 1) {
        this.filteredProducts = this.filteredProducts.sort((a: Product, b: Product) => a.price - b.price)
      } else if (this.activeSortTab.type === 2) {
        this.filteredProducts = this.filteredProducts.sort((a: Product, b: Product) => b.price - a.price)
      } else if (this.activeSortTab.type === 3) {
        this.filteredProducts = this.filteredProducts.sort((a: Product, b: Product) => a.popularity - b.popularity)
      }
    },
    setActiveCategory(category: Categories): void {
      this.categories.forEach((currentCategory: Categories): void => {
        currentCategory.isActive = currentCategory.id === category.id
      })
      this.getProducts(category.id)
    },
    async getProducts(categoryId: number): Promise<void> {
      this.isLoading = true
      const {data: responseProducts} = await useFetch('/api/catalog/getProducts',
          {
            query: {
              category_id: categoryId,
            }
          }
      )
      this.products = responseProducts.value
      this.filterProductsByLength(10)
      this.filterProductsByPrice()
      this.sortProducts()
      this.isLoading = false
    },
  }
}
</script>

<style scoped>
</style>