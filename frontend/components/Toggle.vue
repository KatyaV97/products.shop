<template>
  <div class="toggle-block">
    <div
        class="toggle"
        @click="decrease"
    >-
    </div>
    <input
        class="main-input"
        type="number"
        :disabled="true"
        :value="countProduct"
        :max="max"
        :min="min"
    />
    <div
        class="toggle"
        @click="increase"
    >+
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['decrease', 'increase'],
  props: {
    countProduct: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    decrease(): void {
      const result = Number(this.countProduct) - 1
      if (result === this.min - 1) return
      this.$emit('decrease', result)
    },
    increase(): void {
      const result = Number(this.countProduct) + 1
      if (result === this.max + 1) return
      this.$emit('increase', result)
    }
  }
}
</script>

<style scoped>

</style>