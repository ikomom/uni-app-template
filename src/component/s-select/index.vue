<template>
  <view @click="onClick" class="s-select" style="width: 100%">
    <u-input
      v-model="text"
      disabled
      disabledColor="transparent"
      :placeholder="placeholder"
      border="none"
      suffixIcon="arrow-right"
      style="padding: 6px"
    ></u-input>
    <u-picker
      :disabled="disabled"
      :show="show"
      :loading="loading"
      closeOnClickOverlay
      :columns="pickerColumn"
      :key-name="keyName"
      :defaultIndex="defaultIndex"
      @close="onClose()"
      @cancel="onClose(true)"
      @confirm="onConfirm"
    />
  </view>

</template>

<script>

/**
 * 选择框，不支持多列
 */
export default {
  name: 'SSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String, undefined],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    /**
     * [
     *  {label: string, value: any}
     * ]
     */
    columns: {
      type: Array,
      default: () => ([]),
    },
    // 自定义需要展示的text属性键名
    keyName: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      defaultIndex: [0],
      text: undefined,
      selected: null,
      show: false,
    }
  },
  computed: {
    pickerColumn() {
      return [this.columns]
    },
  },
  watch:{
    value:{
      immediate:true,
      handler(){
        if(this.value && this.columns.length>0){
          this.text=this.columns.find(item=>item.value==this.value)?.label
        }else{
          this.text=''
        }
      }
    },
    columns:{
      immediate:true,
      handler(){
        if(this.value && this.columns.length>0){
          this.text=this.columns.find(item=>item.value==this.value)?.label
        }else{
          this.text=''
        }
      }
    }
  },
  created() {
    /*if(this.value){
      // this.columns.map(item => {
      //   if (item.value === this.value) {
      //     this.text = item.label
      //   }
      // });
      this.text=this.columns.find(item=>item.value==this.value)?.label
    }else{
      this.text=''
    }*/
  },
  methods: {
    onClick(e) {
      if (this.show === false && !this.disabled) {
        this.show = true
        uni.hideKeyboard()
      }
    },
    onClose(clear) {
      console.log('onClose', clear)
      setTimeout(() => {
        this.show = false
        /*if (clear) {
          this.text = undefined
          this.$emit('change', undefined, null)
        }*/
      })
    },
    onConfirm(e) {
      const valueItem = e.value[0]
      this.text = valueItem.label
      console.log('onConfirm', e)
      this.$emit('change', valueItem.value, valueItem)
      this.onClose()
    },
  },
}
</script>

<style scoped lang="scss">

</style>
