<template>
	<view class="template-vip">

		<view class="tn-margin-top">


			<!-- 已开通-->
			<view class="tn-margin">
				<view class="button-vip tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur"
					style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">

					<view class="tn-margin-left">
						<view class='title tn-text-bold tn-text-xl' style="color: #F1C68E;">
							{{userData.member==1?"月卡":userData.member==2?"畅销卡":userData.member==3?"年卡":"普通用户"}}
							<text style="font-style:italic;padding-left: 6rpx;">VIP</text>
						</view>
						<view class='tn-color-white tn-text-sm tn-padding-top-sm'>武汉云晨科技有限公司</view>
					</view>
					<view class="tn-margin-right" v-if="userData.member==0">
						<picker @change="bindPickerChange"  :range="range">
							<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
								width="160rpx" shadow  >
								<text class="tn-text-bold">开 通</text>
							</tn-button>
						</picker>
					</view>
					<view class="tn-margin-right" v-if="userData.member>0">
						<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
							width="160rpx" shadow  @click="show = true">
							<text class="tn-text-bold">分享码</text>
						</tn-button>
					</view>

				</view>
			</view>



			<view class="tn-bdhook-shadow"
				style="border-radius: 10rpx;overflow: hidden;margin: 50rpx 30rpx 30rpx 30rpx;">

				<view class="tn-flex tn-flex-row-between tn-padding tn-text-center tn-bg-brown--light">
					<view class="tn-flex-1">
						<view class="tn-text-bold tn-text-lg">
							服务类型
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-bold tn-text-lg">
							月卡
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-bold tn-text-lg">
							畅销卡
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-bold tn-text-lg">
							年卡
						</view>
					</view>
					
				</view>

				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-strip-bottom-min tn-padding-sm"
					v-for="(item, index) in setList" :key="index" @click="tn(item.url)">
					<view class="tn-flex-1 tn-text-center">
						<view class="tn-text-center">
							{{ item.title }}
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-center">
							{{ item.vip }}
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-center">
							{{ item.vip1 }}
						</view>
					</view>
					<view class="tn-flex-1">
						<view class="tn-text-center">
							{{ item.vip2 }}
						</view>
					</view>
				</view>

			</view>
		</view>
		<tn-popup v-model="show" mode="center" length="70%" borderRadius="10">
		  <view class="boday">
			<image :show-menu-by-longpress='true' :src="img" mode="widthFix" class="img"></image>
			<view class="baocuntitle">长按图片保存</view>
		  </view>
		</tn-popup>
		
		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateVip',
		mixins: [template_page_mixin],
		data() {
			return {
				userData:null,
				show: false,
				img:"",
				range: ['月卡','畅销卡','年卡','月卡体验'],
				setList: [{
						title: "费用",
						vip: "9.9元",
						vip1: "19.9元",
						vip2: "199元"
					},
					{
						title: "有效时间",
						vip: "30天",
						vip1: "30天",
						vip2: "一年"
					},
					{
						title: "接单限制",
						vip: "每天10单",
						vip1: "不限",
						vip2: "不限"
					},
					{
						title: "平台服务费",
						vip: "20%",
						vip1: "10%",
						vip2: "10%"
					},
					{
						title: "提现",
						vip: "24小时到账",
						vip1: "秒到账",
						vip2: "秒到账"
					},
					{
						title: "分享佣金",
						vip: "30%",
						vip1: "50%",
						vip2: "60%"
					}, {
						title: "留言限制",
						vip: "每天10次",
						vip1: "不限",
						vip2: "不限"
					},

				]
			}
		},
		onLoad() {
			this.getuser()
		},
		methods: {
			bindPickerChange: function(e) {
				if(this.userData.telephone==""||this.userData.telephone==null){
					this.$refs.tips.show({
					  msg:"未绑定手机号不可申请！" ,
					  backgroundColor: '#FB6A67',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
					return
				}
				let index = e.detail.value
				let data={
					schoolid:uni.getStorageSync('school').id,
					lxid:index,
					uid:uni.getStorageSync('uid')
					
				}
				if (index==3){
					this.$http.postRequest('OrderUser/xiadan',data )
						.then(res => {
							if(res.code==200){
								this.$refs.tips.show({
								  msg:res.msg ,
								  backgroundColor: '#55aaff',
								  fontColor: '#FFFFFF',
								  duration: 1500
								})
							}else{
								this.$refs.tips.show({
								  msg:res.msg ,
								  backgroundColor: '#FB6A67',
								  fontColor: '#FFFFFF',
								  duration: 1500
								})
							}
						})
				}else{
					this.$http.postRequest('OrderUser/getSign',data )
						.then(res => {
							uni.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(itme) {
								  uni.switchTab({
								  	url:'/pages/index/index'
								  })
								},
								fail: function(err) {
								  console.log('支付失败',err)
								}
							})
						})
				}
				// console.log(data)
				
			},
			getuser() {
				this.$http.postRequest('User/ByData', {
						"id": uni.getStorageSync('uid')
					})
					.then(res => {
						this.userData = res.data
						console.log(res)
						if(res.data.member>0){
							this.getQRCode()
						}
						// console.log(res)
					})
			},
			getQRCode() {
				this.$http.postRequest('QRCode/getQRCode', {
						"uid": uni.getStorageSync('uid')
					})
					.then(res => {
						this.img = "data:image/jpeg;base64,"+res.data
						console.log(res)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 60%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.5);
		color: #FFFFFF;
		font-size: 18px;

		.icon {
			display: block;
			flex: 1;
			margin: auto;
			text-align: center;
		}

	}


	/* 间隔线 start*/
	.tn-strip-bottom-min {
		width: 100%;
		border-bottom: 1rpx solid #F8F9FB;
	}

	.tn-strip-bottom {
		width: 100%;
		border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/

	/* 页面阴影 start*/
	.tn-bdhook-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 8rpx solid rgba(255, 255, 255, 0.05);
		box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	.button-vip {
		width: 100%;
		height: 150rpx;
		border-radius: 15rpx;
		position: relative;
		z-index: 1;

		&::after {
			content: " ";
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			left: 0;
			bottom: 0;
			border-radius: inherit;
			opacity: 1;
			transform: scale(1, 1);
			background-size: 100% 100%;
			background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
		}
	}
.boday{
	padding: 20rpx;
}
.img{
	width: 100%;
}
.baocuntitle{
	padding: 30rpx;
	text-align: center;
	color: #b5b6b7;
}
</style>