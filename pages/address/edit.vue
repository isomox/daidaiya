<template>
	<view class="oa-content">

		<view class="" style="padding-bottom: 240rpx;">


			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						联系人姓名 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
					<view class="tn-color-gray tn-padding-top-xs">
						<input placeholder="请输入联系人" name="input" v-model="from.name" placeholder-style="color:#AAAAAA"
							value=""></input>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						联系人电话 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
					<view class="tn-color-gray tn-padding-top-xs">
						<input placeholder="请输入手机号码" name="input" v-model="from.phone" placeholder-style="color:#AAAAAA"
							value=""></input>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						宿舍信息 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
				</view>
			</view>
			<view class="tn-bg-gray--light tn-padding" style="border-radius: 10rpx;margin: 0 30rpx 30rpx 30rpx;">
				<textarea maxlength="100" v-model="from.address" placeholder="请输入详细宿舍信息"
					placeholder-style="color:#AAAAAA" style="height: 160rpx;"></textarea>
			</view>



			<!-- 悬浮按钮-->
			<view class="tn-flex tn-footerfixed tn-padding">
				<view class="tn-flex-1 justify-content-item   tn-text-center">
					<tn-button backgroundColor="#00C8B0 " padding="40rpx 0" width="100%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" @click="baocun">
						<text class="">保 存</text>
					</tn-button>
				</view>
			</view>

		</view>
		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateReport',
		mixins: [template_page_mixin],
		data() {
			return {
				from: {
					id: 0,
					uid: uni.getStorageSync('uid'),
					name: "",
					phone: "",
					province: "",
					city: "",
					area: "",
					address: ""
				}


			}
		},
		onLoad(e) {
			if (e.id) {
				this.from.id = e.id
				// console.log(111,e)
				this.getadds(e.id)
			}
		},
		methods: {

			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			getadds(id) {
				this.$http.postRequest('Address/bydate', {
						id: id
					})
					.then(res => {
						this.from = res.data
					})
			},
			baocun() {

				if (this.from.name == "") {
					this.$refs.tips.show({
						msg: '请输入姓名',
						backgroundColor: '#E83A30',
						fontColor: '#FFFFFF',
						duration: 1500
					})
					return
				}
				if (this.from.phone == "") {
					this.$refs.tips.show({
						msg: '请输入手机号',
						backgroundColor: '#E83A30',
						fontColor: '#FFFFFF',
						duration: 1500
					})
					return
				}
				if (this.from.address == "") {
					this.$refs.tips.show({
						msg: '请输入宿舍地址',
						backgroundColor: '#E83A30',
						fontColor: '#FFFFFF',
						duration: 1500
					})
					return
				}
				// console.log(this.from)
				this.$http.postRequest('Address/save', this.from)
					.then(res => {
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 2000
						});
						uni.navigateBack({
							delta: 1, //返回层数，2则上上页
						})
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
		font-size: 32rpx;

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

	.tn-strip-top {
		width: 100%;
		border-top: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 160rpx;
		height: calc(180rpx + env(safe-area-inset-bottom) / 2);
		height: calc(180rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(40rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);
	}

	/* 底部悬浮按钮 end*/
</style>
