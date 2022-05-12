<template>
  <u-row :gutter="gutter" class="flex-wrap">
    <u-col
      v-for="(item, index) in format"
      :key="index"
      class="flex"
      align="center"
      :span="item.span || (12 / column)"
      :style="{flexDirection: direction}"
    >
      <u-text :text="item.label + '：'" />
      <u-text :text="data[item.value]"/>
    </u-col>
  </u-row>
</template>

<script>
/**
 * 类似element-ui Description 组件
 */
export default {
  name: 'SDescription',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    format: {
      type: Array,
      default: () => [],
    },
    gutter: {
      type: [Number, String],
      default: 8,
    },
    column: {
      type: Number,
      default: 3,
    },
    direction: {
      type: String,
      default: 'column',
    },
  },
  options: {
    // 微信小程序中 options 选项
    multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    styleIsolation: 'isolated', //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  },
}
</script>

<style scoped>

</style>
