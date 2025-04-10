<template>
	<view class="template-payment">

		<view class="" >

			<view class="">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs tn-padding-bottom-xs">
					<view class="justify-content-item">
						<view class="tn-flex tn-flex-col-center tn-flex-row-left">
							<view class="tn-padding tn-color-black"  >
								<view class="tn-padding-right-sm tn-text-bold">
									<text class="tn-text-xl">{{ByData.shop.title}}</text>
								</view>
								<view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-color-gray">
									<text class="">{{ByData.shop.position}}</text>
								</view>
							</view>
							
						</view>
					</view>
					<view class="tn-flex justify-content-item tn-flex-row-center tn-padding-right-xs" @click="boda">
						<view class="tn-bg-gray--light tn-padding-xs tn-margin-sm tn-color-blue tn-round">
							<text class="tn-icon-tel-circle-fill" style="font-size: 60rpx;"></text>
						</view>
					</view>
				</view>
			</view>

			<block v-for="(item, index) in ByData.orderShopGoods" :key="index">
				<view class="tn-flex tn-flex-col-top tn-margin">
					<view class="image-pic" :style="'background-image:url(' + item.mainimage + ')'" @click="tn('')">
						<view class="image-cart">
						</view>
					</view>
					<view class="tn-padding-left" style="width: 100%;">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between ">
							<view class="justify-content-item">
								<text class="tn-color-black clamp-text-1">{{ item.title }}</text>
							</view>
						</view>
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item tn-padding-top">
								<text class="tn-color-gray clamp-text-1">{{ item.specifications }}</text>
							</view>
						</view>
						<view class="tn-flex tn-flex-row-between tn-flex-col-between tn-padding-top-sm">
							<view class="justify-content-item tn-padding-top-xs">
								<text class="tn-color-gray clamp-text-1">数量：X{{ item.aid }}</text>
							</view>
							<view class="justify-content-item tn-padding-top-xs tn-color-black">
								<text class="clamp-text-1">￥</text>
								<text class="clamp-text-1 tn-text-lg">{{ item.pay }}</text>
							</view>
						</view>
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">

						</view>
					</view>
				</view>

			</block>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-md">
						预约时间 : <text class="tn-color-black tn-text-sm went ">{{ByData.orderShop.yjtime}}</text>
					</view>
				</view>
			</view>
			
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold md">
						订单备注信息 
					</view>
				</view>
			</view>

			<view class="tn-bg-gray--light tn-padding" style="border-radius: 10rpx;margin: 0 30rpx 30rpx 30rpx;">
				{{ByData.orderShop.illustrate}}
			</view>

			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-md">
						下单时间 : <text class="tn-color-black tn-text-sm went ">{{ByData.orderShop.ctime}}</text>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-md">
						订单状态 : <text class="tn-color-black tn-text-sm went ">
						{{ByData.orderShop.status==1?"商家待接单":ByData.orderShop.status==2?"商家备货中":ByData.orderShop.status==3?"派送中":ByData.orderShop.status==4?"已送达":ByData.orderShop.status==9?"订单取消":"已签收"}}
						</text>
					</view>
				</view>
			</view>
			
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="ByData.orderShop.stime">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-md">
						送达时间 : <text class="tn-color-black tn-text-sm went ">{{ByData.orderShop.stime}}</text>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="ByData.orderShop.qtime">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-md">
						签收时间 : <text class="tn-color-black tn-text-sm went ">{{ByData.orderShop.qtime}}</text>
					</view>
				</view>
			</view>
			<view class="anniu">
				<tn-button  width="80vw" padding="40rpx" backgroundColor="#ffaa7f" fontColor="#ffffff" shape="round" @click="quxiao()" v-if="ByData.orderShop.status==1">取消订单</tn-button>
				<tn-button width="80vw" padding="40rpx" backgroundColor="#ffaa7f" fontColor="#ffffff" shape="round" @click="qianshou()" v-if="ByData.orderShop.status==4">商品签收</tn-button>
			</view>

			<view class='tn-tabbar-height'></view>
		<tn-tips ref="tips" position="center"></tn-tips>
		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplatePayment',
		mixins: [template_page_mixin],
		data() {
			return {
				ByData:null,
				
				address:null,
				goodslist:[],
				pay:0,
				illustrate:"",
				yjtime:"随时配送",
				
			}
		},
		onLoad(e) {
			this.getlist(e.id);
		},
		onShow() {
			
		},
		methods: {
			
			getlist(id) {
				this.$http.postRequest('OrderShop/ByData', {id:id})
					.then(res => {
						this.ByData = res.data
					})
			},
			boda(){
				
				uni.makePhoneCall({
					phoneNumber: this.ByData.shop.telephone,
					success: () => {
					  console.log('拨打电话成功！');
					},
					fail: () => {
					  console.error('拨打电话失败！');
					}
				});
			},
			quxiao(){
				this.$http.postRequest('OrderShop/applyBack', {
					id:this.ByData.orderShop.id,
					}).then(res => {
						// this.Order=res.data
						// console.log(res)
						if(res.code==200){
							this.getlist(this.ByData.orderShop.id)
						}else{
							this.$refs.tips.show({
							  msg:"取消失败！" ,
							  backgroundColor: '#FB6A67',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
							// uni.navigateBack({
							// 	delta: 1, //返回层数，2则上上页
							// })
						}
					})
			},
			qianshou(){
				this.$http.postRequest('OrderShop/qianshou', {
					id:this.ByData.orderShop.id,
					}).then(res => {
						// this.Order=res.data
						// console.log(res)
						if(res.code==200){
							this.getlist(this.ByData.orderShop.id)
						}else{
							this.$refs.tips.show({
							  msg:"签收失败！" ,
							  backgroundColor: '#FB6A67',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
							// uni.navigateBack({
							// 	delta: 1, //返回层数，2则上上页
							// })
						}
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

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}

	/* 底部 start*/
	.footerfixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 999;
		// background-color: rgba(255,255,255,1);
		// box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.tabbar {
		align-items: center;
		min-height: 130rpx;
		padding: 0;
		height: calc(130rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
		padding-left: 10rpx;
		padding-right: 10rpx;
	}


	.image-cart {
		width: 200rpx;
		height: 200rpx;
		font-size: 16rpx;
		font-weight: 300;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		// border-radius: 15rpx 15rpx 0 0;
	}
	.went{
		color: #7a7a7a !important;
		font-weight: 400 !important;
		margin-left: 20rpx;
	}
	.tn-padding{
		padding: 10rpx 30rpx !important;
	}
	.anniu{
		margin-top: 50rpx;
		text-align: center;
	}
</style>