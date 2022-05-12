<template>
  <view @click="onClick" style="width: 100%">
    <u-input
      v-model="text"
      disabled
      disabledColor="transparent"
      :placeholder="placeholder"
      border="none"
      suffixIcon="arrow-right"
      style="padding: 6px"
    ></u-input>
    <u-calendar
      :show="show"
      :mode="mode"
      closeOnClickOverlay
      @close="onClose"
      @confirm="onConfirm"
    />
  </view>

</template>

<script>

/**
 * 选择框，不支持多列
 */
export default {
  name: 'SCalendar',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Array, undefined],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    mode: {
      type: String,
      default: 'single',
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(vel) {
        if (vel) {
          this.text = vel instanceof Array ? vel.join(',') : vel
        }
        console.log('vel', vel)
      },
    },
  },
  data() {
    return {
      text: undefined,
      show: false,
    }
  },
  methods: {
    onClick() {
      this.show = true
      uni.hideKeyboard()
    },
    onClose() {
      this.show = false
    },
    onConfirm(value) {
      console.log('value', value)
      if (this.mode == 'single') { // 单选
        this.$emit('change', value[0])
      } else if (this.mode == 'range') {
        const min = value[0]
        const max = value[value.length - 1]
        value = [min, max]
        this.$emit('change', value)
      }
      this.text = value.join(',')
      this.onClose()
    },
  },
}
</script>

<style scoped lang="scss">

</style>
