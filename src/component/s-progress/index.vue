<template>
  <u-modal :showConfirmButton="isOk || error" :show="show" @confirm="confirm" :title="title">
    <view style="font-size:14px; line-height:2;height:auto;width:100%;display:flex;justify-content:center;">
      <view v-if="error" style="width:100%;">{{error}}</view>
      <view v-if="!isOk" style="width:80%;height:auto;">
        <u-line-progress   :percentage="percentage" activeColor="#ff0000"></u-line-progress>
        <view >您的投票结果正在上传至中移链</view>
      </view>
      <view v-if="isOk">
        您的投票结果已存储在中移链，<br/>
      交易哈希是**** ，当前区块是***
      </view>
    </view>
  </u-modal>
</template>

<script>
export default {
  name:'SProgress',
  props:{
    api:{
      type:Function,
      default:()=>{}
    }
  },
  data(){
    return{
      title:'温馨提示',
      show:false,
      isOk:false,
      percentage:0,
      res:null,
      error:null
    }
  },
  methods:{
    confirm(){
      this.resolve(this.res)
      this.show = false;
      this.percentage = 0;
      this.res = null
      this.error = null;
      setTimeout(()=>{
        this.isOk = false;
      })
    },
    start({params}){
      return new Promise((resolve,reject)=>{
        this.resolve = resolve;
        this.show = true;
        this.api(params).then((res)=>{
          if(res.code === 'SUCCESS'){
            this.res = res;
          }else{
            this.error = res.message; 
            clearTimeout(this.timer3)
            clearInterval(this.timer1)
            clearInterval(this.timer2)
          }
        })
        this.timer1 = setInterval(()=>{
          this.percentage += Number(((100 - this.percentage) * Math.random()).toFixed(0))
        },500)
        this.timer3 = setTimeout(()=>{
          clearInterval(this.timer1)
          if(this.res) {
            this.isOk = true;
            this.percentage = 100;
            this.$store.dispatch('app/reachAgreement',{text:'xxxxxxxxx'})
          }else{
            this.timer2 = setInterval(()=>{
              if(this.isOk) {
                this.percentage = 100;
                this.$store.dispatch('app/reachAgreement',{text:'xxxxxxxxx'})
                clearInterval(this.timer2)
              }
            },500)
          }
        },3000)
      })
    }
  }
}
</script>

<style>

</style>