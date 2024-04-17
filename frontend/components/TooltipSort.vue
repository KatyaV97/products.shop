<template>
  <div class="tooltip-block"
       :class="{
                  '_show': show,
               }"
  >
    <div
        class="tab"
        v-for="tab in sortInfo"
        :key="tab.type"
        @click.stop.prevent="$emit('changeSort', tab)"
    >
      <p class="_non-space">
        {{ tab.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type {SortTab} from "~/types/tabs"

export default {
  emits: ['changeSort'],
  props: {
    sortInfo: {
      type: Array as () => SortTab[],
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>