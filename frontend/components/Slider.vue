<template>
  <div class="slider-container">

    <label for="slider-input-left" class="slider-input-left">
      <span class="_non-space price">Цена: </span>
      <input
          type="number"
          class="main-input-left"
          v-model="leftValue"
          @input="updateSliderFromInput"
      />
      <span class="_non-space rouble">№</span>
    </label>
    <label for="slider-input-right" class="slider-input-left">
      <span class="_non-space price">- </span>
      <input
          type="number"
          class="main-input-right"
          v-model="rightValue"
          @input="updateSliderFromInput"
      />
      <span class="_non-space rouble">№</span>
    </label>
    <VueSlider
        v-model="sliderValues"
        :min="min"
        :max="max"
        :animate="'fast'"
        :tooltip="'always'"
        range
        @update:modelValue="updateInputsFromSlider"
    />
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

// import theme
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    VueSlider
  },
props:{
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const min = props.min;
    const max = props.max;
    const sliderValues = ref([min, max]);
    const leftValue = computed({
      get: () => sliderValues.value[0],
      set: (val) => {
        if (val < sliderValues.value[1]) {
          sliderValues.value[0] = val;
        }
      }
    });
    const rightValue = computed({
      get: () => sliderValues.value[1],
      set: (val) => {
        if (val > sliderValues.value[0]) {
          sliderValues.value[1] = val;
        }
      }
    });

    watch(sliderValues, (newValues) => {
      if (newValues[0] > newValues[1]) {
        sliderValues.value = [newValues[1], newValues[1]];
      }
    });

    function updateInputsFromSlider(newValues) {
      if (newValues[0] > newValues[1]) {
        sliderValues.value = [newValues[1], newValues[1]];
      }
    }

    function updateSliderFromInput() {
      if (leftValue.value > rightValue.value) {
        const temp = rightValue.value;
        rightValue.value = leftValue.value;
        leftValue.value = temp;
      }
    }

    return {
      min,
      max,
      sliderValues,
      leftValue,
      rightValue,
      updateInputsFromSlider,
      updateSliderFromInput
    };
  }
};
</script>

<style scoped>
& input[type=number]::-webkit-inner-spin-button,
& input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

& input[type=number] {
  -moz-appearance: textfield;
}
</style>