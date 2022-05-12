<template>
  <u-grid
    :col="col"
    :border="false"
  >
    <u-grid-item
      v-for="(listItem,index) in list"
      :key="index"
      @click="onClickItem(listItem, index)"
      class="text-center"
    >
      <u-image
        v-if="listItem.img"
        :src="listItem.img"
        mode="widthFix"
        width="50"
        height="50"
        class="mb-1"
      />
      <u-icon
        v-else
        :customStyle="{paddingTop:20+'rpx'}"
        :name="listItem.name"
        :size="listItem.size || 40"
      ></u-icon>
      <text style="font-size: 12rpx">{{ listItem.title }}</text>
    </u-grid-item>
  </u-grid>
</template>

<script>
export default {
  name: 'SGridIcons',
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    col: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    onClickItem(listItem, index) {
      this.$emit('click', {
        listItem,
        index,
      })
    },
  },
}
</script>

<style scoped>

</style>
