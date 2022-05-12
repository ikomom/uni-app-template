<template>
  <u-list
    :height="height"
    :lowerThreshold="lowerThreshold"
    @scrolltolower="scrolltolower"
  >
    <view v-if="status==='loading' && pageInfo.pageNum===1" class="loading" :style="{height:height}">
      <u-loading-icon></u-loading-icon>
    </view>
    <view v-else-if="error" class="text-center">加载出错</view>
    <template v-else>
      <slot name="listData" :list="listData"></slot>
      <u-loadmore :status="status"/>
    </template>
  </u-list>
</template>

<script>

export default {
  name: 'SList',
  props: {
    api: {
      type: [Function],
      required: true,
    },
    // 所有内容元素不大于list的height不会加载
    height: {
      type: [String, Number],
      default: '100vh',
    },
    lowerThreshold: {
      type: [String, Number],
      default: 100,
    },
  },
  created() {
    this.getMoreData()
  },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      status: 'loadmore',
      finished: false,
      refreshing: false,
      error: null,
      listData: [],
      urls: [],
    }
  },
  methods: {
    refresh() {
      this.refreshing = true
      this.getMoreData()
    },
    getMoreData() {
      if (this.refreshing) {
        this.pageInfo.pageNum = 1
        this.status = 'loadmore'
      }

      if (this.api && !['loading', 'nomore'].includes(this.status)) {
        this.status = 'loading'
        this.api(this.pageInfo)
          .then(res => {
            // console.log('res', res, this.listData, this.pageInfo.pageNum)
            if (this.refreshing || res.currPage === 1) {
              this.listData = res.rows
            } else {
              this.listData = [...this.listData, ...res.rows]
            }
            // if (this.pageInfo.pageNum >= res.pageNum) {
            if (res.currPage >= res.pageNum) {
              console.log('nomore', res)
              this.status = 'nomore'
            } else {
              this.pageInfo.pageNum++
              this.status = 'loadmore'
            }
          })
          .catch(e => {
            console.error(e)
            this.status = 'loadmore'
            this.error = true
          })
          .finally(() => {
            this.refreshing = false
          })
      }
    },
    scrolltolower() {
      console.log('加载更多', {
        ...this.pageInfo,
        status: this.status,
      })
      this.getMoreData()
    },
  },
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
