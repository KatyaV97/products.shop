<template>
  <div
      class="alert _hidden"
      @mouseenter="onFocus"
      @mouseleave="onBlur"
      :class="
        {
          '_done' : !show && value && value.length > 0,
          '_show' : show
        }"
  >
    <div class="done">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           viewBox="0 0 20 20"
           fill="none">
        <path fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0
              4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.669 7.74325C16.0795 7.37376
              16.1127 6.74147 15.7432 6.33098C15.3738 5.9205 14.7415 5.88726 14.331
              6.25675L8.33413 11.6547L5.66886 9.25661C5.2583 8.88721 4.62601 8.92058
              4.25661 9.33114C3.88721 9.7417 3.92058 10.374 4.33114 10.7434L7.66541
              13.7434C8.04574 14.0856 8.62302 14.0855 9.00329 13.7432L15.669 7.74325Z"
              fill="#45B80B"/>
      </svg>
    </div>
    <p class="_non-space">
      {{ value }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Alert",
  emits: ['focus'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      focus: false as boolean
    }
  },
  methods: {
    onFocus(): void {
      this.$emit('focus', this.focus = true)
    },
    onBlur(): void {
      this.$emit('focus', this.focus = false)
    }
  }
}
</script>

<style scoped>
</style>
