<template>
 <view style="width:80%;margin:0 auto;">
   <u-cell  :border="false">
   </u-cell>
   <u-cell v-if="type === 2"  :border="false">
     <template slot="label">
       <span>请先进行实名认证</span>
     </template>
   </u-cell>
   <view v-if="type === 1"  style="margin-top:120px;display:flex;flex-direction:column;line-height:2;">

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
					label="验证码"
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
      <u-button type="primary" @click="registerAndVerify()" text="验证并注册"></u-button>
    </view>

    <view v-if="type === 2"  style="margin-top:120px;display:flex;flex-direction:column;line-height:2;">
      <u--form
				labelPosition="top"
				:model="model2"
        labelWidth="150"
				ref="form2"
        style="margin-bottom:80px;"
		>
			<u-form-item
					label="姓名"
					prop="xm"
					borderBottom
					ref="item2"
			>
				<u--input
						v-model="model2.xm"
						border="none"
            placeholder="请输入姓名"
				></u--input>
			</u-form-item>
      <u-form-item
					label="身份证号"
					prop="userInfo.code"
					borderBottom
					ref="item2"
			>
				<u--input
						v-model="model2.sfz"
						disabledColor="#ffffff"
						placeholder="请输入身份证号"
						border="none"
				>
        </u--input>
			</u-form-item>
		</u--form>
      <u-button type="primary" @click="startVerify()" text="开始人脸识别认证"></u-button>
    </view>
 </view>

</template>

<script>
export default {
  data() {
    return {
      type: 1, // 1、验证并注册 2、开始人脸识别认证
      model1: {
        userInfo: {
          phone: '',
          password: '',
          code: '',
        },
      },
      model2: {
        xm: '',
        sfz: '',
      },
    }
  },
  methods: {
    registerAndVerify() {
      this.type = 2
      this.model2 = {
        xm: '',
        sfz: '',
      }
    },
    startVerify() {
      this.model1 = {
        userInfo: {
          phone: '',
          password: '',
          code: '',
        },
      }
    },
  },
}
</script>

<style>

</style>
