<template>
  <u-loading-page v-if="loading" :loading="loading"></u-loading-page>
  <div v-else class="common-layout flex flex-col">
    <template v-if="showHeader">
      <view class="header-bg"></view>
      <view class="content-bg"></view>
      <view class="layout-slide common-header">
        <image
          src="/static/images/home/yidongWhite.png"
          style="width: 120rpx"
          mode="widthFix"
        />
        <text style="font-size: 30rpx">{{headerText}}</text>
        <text style="font-size: 25rpx">基于区块链</text>
      </view>
    </template>
    <view class="flex-1 overflow-auto">
      <slot />
    </view>
    <u-tabbar
      v-if="showBar"
      :value="activeTab"
      @change="onChangeTab"
      fixed
      safeAreaInsetBottom
      placeholder
    >
      <u-tabbar-item
        v-for="item in tabItems"
        :name="item.path"
        :key="item.icon"
        :icon="item.icon"
        :text="item.text"
      >
        <u-image
          v-if="item.activeImg"
          slot="active-icon"
          width="18"
          height="18"
          :src="`/static/images/${item.activeImg}`"
        />
        <u-image
          v-if="item.unActiveImg"
          width="18"
          height="18"
          slot="inactive-icon"
          :src="`/static/images/${item.unActiveImg}`"
        />
      </u-tabbar-item>
    </u-tabbar>
  </div>
</template>

<script>
const tabsOrigin = [
  {
    text: '首页',
    icon: 'home-fill',
    path: '/pages/front/index',
  },
  {
    text: '社区通讯录',
    activeImg: 'home/address-list-active.png',
    unActiveImg: 'home/address-list.png',
    path: '/pages/backstage/addressBook/index',
  }
]
export default {
  name: 'CommonLayout',
  props: {
    headerText: {
      type: String,
    },
    showHeader: {
      type: Boolean,
      default: false,
    },
    initApi: {
      type: Function,
    },
    showBar: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.initApi) {
      this.loading = true
      this.initApi()
        .then((res) => {
          console.log(res)
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      // this.loading = true
      // setTimeout(() => {
      //   this.loading = false
      // }, 200)
    }
  },
  computed: {
    tabItems() {
      const tabs = [...tabsOrigin]
      tabs.push({
        text: '投票',
        activeImg: 'home/vote-active.png',
        unActiveImg: 'home/vote.png',
        path: '/pages/front/consultative/VoteList',
      })
      tabs.push({
        text: '公告配置',
        activeImg: 'home/notify-setting-active.png',
        unActiveImg: 'home/notify-setting.png',
        path: '/pages/backstage/problem/wtggpzBar',
      })
      return tabs
    },
  },
  data() {
    return {
      loading: false,
      activeTab: this.$Route.fullPath,
      query: this.$Route.query,
    }
  },
  methods: {
    onChangeTab(url) {
      console.log('this.$route', url, this.$Route.path)
      uni.redirectTo({
        url,
        fail: (e) => {
          console.error(e)
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.common-layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 20rpx;
  min-height: 100vh;

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: url('~@/static/images/home/headBg.png') no-repeat;
    background-size: contain;
    width: 100%;
    height: 500rpx;
    z-index: -1;
  }

  .content-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    background: url('~@/static/images/home/bj.png') no-repeat;
    background-size: cover;
  }

  .common-header {
    color: #ffffff;
    margin-top: 80rpx;
    margin-bottom: 40rpx;
  }
}

</style>
