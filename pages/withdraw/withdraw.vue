<template>
	<view class="template-integral tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left'></text>
				<text class='icon tn-icon-home-capsule-fill'></text>
			</view>
		</tn-nav-bar>


		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="background: linear-gradient(180deg, #FEF5E4, #F9FFF9);">
			<view class="tn-padding-top-xl">
				<view class="tn-flex adver-wrap ">
					<view class="tn-text-center tn-flex-1">
						<view class="tn-text-xxl tn-text-bold">{{userData.pay}}</view>
						<view class="tn-text-lg  tn-padding-left-xs" style="">可提现</view>
					</view>
					<view class="tn-text-center tn-flex-1">
						<view class="tn-text-xxl tn-text-bold">{{userData.dpay}}</view>
						<view class="tn-text-lg tn-padding-left-xs" style="">待入账</view>
					</view>
					<view class="tn-text-center tn-flex-1">
						<view class="tn-text-xxl tn-text-bold">{{userData.zpay}}</view>
						<view class="tn-text-lg tn-padding-left-xs" style="">总收益</view>
					</view>
				</view>
				<!-- <view class="tn-padding-top-xl">
					<view class="tn-text-center tn-color-gray">
						已提现 73,067
					</view>
				</view> -->

			</view>
		</view>
		<view class="tn-margin">
			<view class="button-vip tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur"
				style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">

				<view class="tn-margin-left">
					<view class='title' style="color: #F1C68E;">
						<text class="tn-text-bold tn-text-xl">立即提现</text>
					</view>
					<view class='tn-color-white tn-padding-top-xs wenzi'>每天只能提现一次，最高200元，最低1元</view>
				</view>
				<view class="tn-margin-right">
					<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
						width="160rpx" shadow  @click="open()">
						<text class="tn-text-bold">提 现</text>
					</tn-button>
				</view>

			</view>
		</view>
		<view class="">
			<tn-picker mode="time" v-model="show" :params="params" :startYear="startYear" :endYear="endYear"
				@confirm="confirmPicker"></tn-picker>
		</view>
		<view class="">
			<view class="tn-padding-top">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center">
					<view class="justify-content-item tn-margin tn-text-bold tn-text-lg">
						收入明细
					</view>
					<view @tap="showPicker"
						class="justify-content-item tn-margin-right tn-padding-xs tn-text-sm tn-bg-gray--light tn-radius tn-color-gray--dark">
						<text class="tn-padding-left-xs tn-padding-right-xs">{{result}}</text>
						<text class="tn-icon-down tn-padding-right-xs"></text>
					</view>
				</view>
			</view>
			<view class="">
				<view class="tn-padding-bottom-lg">
					<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding"
						v-for="(item,index) in list" :key="index">
						<view class="justify-content-item">
							<view class="tn-color-friend tn-text-lg">
								{{item.title}}
							</view>
							<view class="tn-color-light tn-padding-top-xs">
								{{item.ctime}}
							</view>
						</view>
						<view class="justify-content-item tn-text-xl tn-padding-top">
							<view class="tn-color-gray-new;">{{item.lxid==0?"+":"-"}} {{item.pay}} </view>
						</view>
					</view>

				</view>
			</view>
			<view v-if="list.length==0" class="wu">
				<tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无数据"></tn-empty>
			</view>
		</view>

		<tn-modal v-model="show1" :title="title" :content="content"  :button="button" @click="tixian"></tn-modal>

		<tn-tips ref="tips" position="center" ></tn-tips>


		<!-- <view class="tn-margin tn-padding-top-xl">
      <view class="tn-bg-gray--light tn-flex" style="border-radius: 10rpx;padding: 20rpx 30rpx;">
        <text class="tn-flex tn-text-xl tn-padding-right-xs">￥</text>
      	<input placeholder="请输入提现金额" name="input" placeholder-style="color:#AAAAAA" ></input>
      </view>
    </view> -->


		<!-- 悬浮按钮-->
		<!-- <view class="tn-flex tn-footerfixed">
			<view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center">
				<tn-button backgroundColor="#00C8B0" padding="40rpx 0" width="60%" shadow fontBold @tap="upload">
					
					<text class="tn-color-white">确认提现</text>
				</tn-button>
			</view>
		</view> -->

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateIntegral',
		mixins: [template_page_mixin],
		data() {
			return {
				amount:0,
				userData: {},
				title:"立即提现",
				content:"提现金额：200元",
				show: false,
				show1: false,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				startYear: 2020,
				endYear: 2200,
				result: "",
				list: [],
				button: [{
						text: '取消',
						backgroundColor: '#E6E6E6',
						fontColor: '#555555',
						plain: true,
						shape: 'round'
					},
					{
						text: '确定',
						backgroundColor: 'tn-bg-indigo',
						fontColor: '#FFFFFF'
					}
				]

			}
		},
		onLoad() {
			let now = new Date();
			let year = now.getFullYear();
			let month = ('0' + (now.getMonth() + 1)).slice(-2);
			this.result = year + "-" + month;
			this.getuser();
			this.getlist();

		},
		methods: {
			getuser() {
				this.$http.postRequest('User/ByData', {
						"id": uni.getStorageSync('uid')
					})
					.then(res => {
						this.userData = res.data
						// console.log(res)
					})
			},
			showPicker(event) {
				this.show = true
			},
			open() {
				 let pay=this.userData.pay;
				 if(pay<=200){
					 if(pay>=1){
						this.amount=pay;
						this.content="提现金额："+pay+"元"; 
						this.show1 = true;
					 }else{
						this.$refs.tips.show({
						   msg: '余额不足1元，不可提现',
						   backgroundColor: '#E83A30',
						   fontColor: '#FFFFFF',
						   duration: 1500
						 })
					 }
					 
				 }else{
					 this.amount=200
					 this.content="提现金额：200元";
					 this.show1 = true;
				 }
				// 
			  },
			confirmPicker(event) {
				this.result = `${event.year}-${event.month}`
				this.getlist()
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			getlist() {
				this.$http.postRequest('RevenueDetails/list', {
						"uid": uni.getStorageSync('uid'),
						"ctime": this.result
					})
					.then(res => {
						this.list = res.data
					})
			},
			tixian(index){
				if(index.index==0){
					this.show1 = false;
				}else{
					this.$http.postRequest('UserPay/pay', {
							"uid": uni.getStorageSync('uid'),
							"amount": this.amount
						})
						.then(res => {
							if(res.code==200){
								this.$refs.tips.show({
								   msg: '提现成功',
								   backgroundColor: '#55aaff',
								   fontColor: '#FFFFFF',
								   duration: 1500
								 })
							}else{
								this.$refs.tips.show({
								   msg: res.msg,
								   backgroundColor: '#E83A30',
								   fontColor: '#FFFFFF',
								   duration: 1500
								 })
							}
						})
				}
				console.log(111,index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 100%;
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

		&:before {
			content: " ";
			width: 1rpx;
			height: 110%;
			position: absolute;
			top: 22.5%;
			left: 0;
			right: 0;
			margin: auto;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			opacity: 0.7;
			background-color: #FFFFFF;
		}
	}

	/* 顶部背景图 start */
	.top-backgroup {
		height: 450rpx;
		z-index: -1;

		.backgroud-image {
			width: 100%;
			height: 450rpx;
			// z-index: -1;
		}
	}

	/* 顶部背景图 end */

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/

	/* 页面 start*/
	.integral-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	/* 阴影 start*/
	.tn-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.integral-wrap {
		position: relative;
		z-index: 1;
	}

	/* 页面 end*/

	/* 翘边阴影*/
	.shadow-warp {
		position: relative;
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.01);
	}

	.shadow-warp:before,
	.shadow-warp:after {
		position: absolute;
		content: "";
		top: 20rpx;
		bottom: 30rpx;
		left: 20rpx;
		width: 50%;
		box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.2);
		transform: rotate(-3deg);
		z-index: -1;
	}

	.shadow-warp:after {
		right: 20rpx;
		left: auto;
		transform: rotate(3deg);
	}

	// 银行卡
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
	.wenzi {
		font-size: 24rpx;
	}
</style>