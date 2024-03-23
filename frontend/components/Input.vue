<template>
    <div
        class="input-body"
        v-on:mouseover="hover = true"
        v-on:mouseleave="hover = false"
        :class="
        {
          '_focus' : focus,
          '_invalid' : invalid
        }"
    >
      <div class="left">
        <input
            class="main-input"
            ref="input"
            @focus="setFocus"
            @blur="removeFocus"
            :placeholder="placeholder"
            type="text"
            :id="'input' + id"
            :value="value"
            v-on:keydown.enter="focus = false"
            @input="setValue($event.target.value)"
        >
      </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Input",
  emits: ['input', 'blur', 'updateInvalid'],
  props: {
    value: {
      type: String,
      required: true
    },
    invalid: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    placeholder:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hover: false as boolean,
      title: '' as string,
      realType: '' as string,
      focus: false as boolean,
      mainInput: {} as object,
    }
  },
  methods: {
    setFocus(): void {
      this.$emit('updateInvalid', true)
      this.focus = true
    },
    removeFocus(): void {
      this.focus = false
      this.onBlur()
    },
    onBlur(): void {
      this.$emit('blur')
    },
    setValue(text: string): void {
      this.$emit('input', text)
    },
  },
}
</script>

<style scoped>
</style>
