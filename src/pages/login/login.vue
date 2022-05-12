<template>
  <view style="width:80%;margin:0 auto;">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u-cell @click="goRegsiter()"  :value=" type === 3 ? '':'注册'" :border="false"></u-cell>
    <view v-if="!type" style="margin-top:120px;display:flex;flex-direction:column;line-height:2;">
      <view style="text-align:center;">188****8888</view>
      <u-button type="primary" text="本机号码一键登录"></u-button>
      <view style="display:flex;justify-content:center;color:#797979;">
        <span @click="changeType(1)">验证码登录</span> <span style="padding:0 12px;">|</span> <span @click.stop="changeType(2)">密码登录</span>
      </view>
    </view>

    <view v-if="type === 2 || type === 1" style="margin-top:120px;display:flex;flex-direction:column;line-height:2;">

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
					prop="userInfo.phone"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.userInfo.name"
						border="none"
            placeholder="请输入手机号"
				></u--input>
			</u-form-item>
			<u-form-item
					label="密码"
          v-if="type === 2"
					prop="userInfo.password"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.userInfo.sex"
						disabledColor="#ffffff"
						placeholder="请输入密码"
						border="none"
				></u--input>
			</u-form-item>
      <u-form-item
					label="验证码"
          v-if="type === 1"
					prop="userInfo.code"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.userInfo.code"
						disabledColor="#ffffff"
						placeholder="请输入验证码"
						border="none"
				>
          <template slot="suffix">
            <div @click.stop="sendCode">发送验证码</div>
          </template>
        </u--input>
			</u-form-item>
		</u--form>
      <u-button type="primary" text="登录"></u-button>
      <view v-if="type === 2" style="display:flex;justify-content:center;color:#797979;">
         <span @click.stop="changeType(undefined)">一键登录</span> <span style="padding:0 12px;">|</span> <span @click="changeType(1)">验证码登录</span>
      </view>
      <view v-if="type === 1" style="display:flex;justify-content:center;color:#797979;">
         <span @click.stop="changeType(undefined)">一键登录</span> <span style="padding:0 12px;">|</span> <span @click="changeType(2)">密码登录</span>
      </view>
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      type: undefined,
      showSex: false,
      model1: {
        userInfo: {
          phone: '',
          password: '',
          code: '',
        },
      },
    }
  },
  methods: {
    goRegsiter() {
      uni.navigateTo({
        url: '/pages/login/register',
      })
    },
    sexSelect(e) {
      this.model1.userInfo.sex = e.name
      this.$refs.form1.validateField('userInfo.sex')
    },
    sendCode() {

    },
    changeType(type) { // 1 验证码登录 2密码登录 3 注册
      this.type = type
      this.model1.userInfo =
        {
          phone: '',
          password: '',
          code: '',
        }
    },
  },
}
</script>

<style>

</style>
