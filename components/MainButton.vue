<template>
  <div class="main-button-block">
    <button
        class="main-btn"
        :disabled="disabled"
        :class="{
          '_main' : classes.includes('main'),
          '_big' : classes.includes('big'),
          '_small' : classes.includes('small'),
           '_auto' : classes.includes('auto'),
        }"
    >
      <slot/>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "MainButton",
  props: {
    classes: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>