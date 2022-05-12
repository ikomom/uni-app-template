<template>
  <view style="width:80%;margin:0 auto;">
    <u-cell  :border="false">
     <template slot="label">
       <span style="font-size:24px;">找回密码</span>
     </template>
   </u-cell>
   <view  style="margin-top:80px;display:flex;flex-direction:column;line-height:2;">
      
      <u--form
				labelPosition="top"
				:model="model1"
        labelWidth="150"
				:rules="rules"
				ref="form1"
        style="margin-bottom:80px;"
		>
			<u-form-item
					label="手机号码"
					prop="phone"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.phone"
						border="none"
            placeholder="请输入手机号"
				></u--input>
			</u-form-item>
      <u-form-item
					label="验证码"
					prop="code"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.code"
						disabledColor="#ffffff"
						placeholder="请输入验证码"
						border="none"
				>
          <template slot="suffix">
            <div @click.stop="sendCode">发送验证码</div>
          </template>
        </u--input>
			</u-form-item>
      <u-form-item
					label="密码"
					prop="password"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.password"
						disabledColor="#ffffff"
						placeholder="请输入密码"
						border="none"
				>
        </u--input>
			</u-form-item>
		</u--form>
      <u-button type="primary" @click="findPassword()" text="提交"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return {
      model1:{
        phone:'',
        code:'',
        password:''
      }
    }
  },
  methods:{
    findPassword(){

    }
  }
}
</script>

<style>

</style>