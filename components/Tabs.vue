<template>
  <div class="tabs-block">
    <div
        v-for="tab in tabs"
        :key="tab.name"
        class="tab"
        :class="{
          '_active': tab.isActive,
          '_active-TV': tab.name === 'Интернет и ТВ',
          '_default': classes.includes('default'),
          '_perfect-color': classes.includes('perfect-color')
        }"
        @click="setActive(tab)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['getActiveTab'],
  props: {
    tabs: {
      type: Array,
      required: true
    },
    classes:{
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  methods: {
    setActive(tab: object): void {
      this.tabs.forEach(element => {
        element.isActive = element === tab
      })
      this.getActiveTab(tab)
    },
    getActiveTab(tab: object): void {
      this.$emit('getActiveTab', tab)
    }
  }
}
</script>

<style scoped>

</style>