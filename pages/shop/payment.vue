<template>
	<view class="template-payment">

		<view class="" >

			<view class="" @click="tn('/pages/address/address?lx=1')">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs tn-padding-bottom-xs">
					<view class="justify-content-item">
						<view class="tn-flex tn-flex-col-center tn-flex-row-left">
							<view class="tn-padding tn-color-black"  v-if="address">
								<view class="tn-padding-right-sm tn-text-bold">
									<text class="tn-text-xl">{{address.name}}</text>
									<text class="tn-padding-left-sm tn-text-lg">{{address.phone}}</text>
								</view>
								<view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-color-gray">
									<text class="">{{address.address}}</text>
								</view>
							</view>
							<view class="tn-padding tn-color-black"  v-if="!address">
								<view class="tn-padding-right-sm tn-text-bold">
									<text class="tn-text-xl">请选择联系人</text>
									<text class="tn-padding-left-sm tn-text-lg"></text>
								</view>
								<view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-color-gray">
									<text class=""></text>
								</view>
							</view>
						</view>
					</view>
					<view class="tn-flex justify-content-item tn-flex-row-center tn-padding-right-xs">
						<view class="tn-bg-gray--light tn-padding-xs tn-margin-sm tn-color-black tn-round">
							<text class="tn-icon-location-fill" style="font-size: 60rpx;"></text>
						</view>
					</view>
				</view>
			</view>

			<block v-for="(item, index) in goodslist" :key="index">
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
			<picker @change="timebindPickerChange" :value="tindex" :range="timelist"  >
				<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
					<view class="justify-content-item">
						<view class="tn-text-bold tn-text-lg">
							预约时间 <text class="tn-color-red tn-padding-left-xs">*</text>
						</view>
			
						<view class="tn-color-black tn-padding-top-xs">
							{{timelist[tindex]}}
						</view>
					</view>
					<view class="justify-content-item tn-text-lg tn-color-grey">
						<view class="tn-icon-time tn-padding-top"></view>
					</view>
				</view>
			</picker>
			
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						订单备注信息 
					</view>
				</view>
				<view class="tn-flex justify-content-item tn-color-gray">
					50字内
				</view>
			</view>

			<view class="tn-bg-gray--light tn-padding" style="border-radius: 10rpx;margin: 0 30rpx 30rpx 30rpx;">
				<textarea maxlength="50" placeholder="请输入订单备注信息" v-model="illustrate" placeholder-style="color:#AAAAAA"
					style="height: 160rpx;"></textarea>
			</view>

			<view class="tabbar footerfixed tn-bg-gray--light">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs">
					<view class="justify-content-item tn-margin-top">
						<view class="tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-flex tn-flex-row-center tn-flex-col-center">
								<view class="tn-padding-right tn-padding-left tn-text-ellipsis">
									<text class="tn-text-xxl">￥</text>
									<text class="tn-text-xxl tn-padding-left-xs">{{pay}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="justify-content-item tn-flex tn-flex-row-center tn-margin-top tn-padding-right">
						
						<view class="tn-flex-1 justify-content-item tn-margin-right-sm tn-text-center">
							<tn-button shape="round" backgroundColor="tn-bg-black" width="110%" @click="zhifu">
								<text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
									立即支付
								</text>
							</tn-button>
						</view>
					</view>
				</view>
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
				address:null,
				goodslist:[],
				pay:0,
				illustrate:"",
				yjtime:"随时配送",
				tindex:0,
				timelist: ['随时配送', '12:00到14:00', '17:00到19:00', '19:00到22:00','明天7:00到9:00','明天12:00到14:00','明天17:00到19:00'],
			}
		},
		onShow() {
			this.address=uni.getStorageSync('address')
			this.goodslist=uni.getStorageSync('goodslist')
			let qian=0;
			this.goodslist.forEach(function(item,index,arr){
				if(item.aid>0){
					qian=qian+item.aid*item.pay;
				}
			})
			this.pay=qian;
		},
		methods: {
			timebindPickerChange: function(e) {
				let tindex = e.detail.value;
				this.tindex=tindex;
				// this.yjtime=this.timelist[tindex]
			},
			zhifu(){
				let yjtime="";
				var d = new Date();
				// d.getFullYear()+"-"+(d.getMonth()+1)
				// d.getTime()
				let time=this.gettime(d.getTime());
				let mtime=this.gettime(d.getTime()+86400000);
				if(this.tindex==0){yjtime="随时配送";}
				else if(this.tindex==1){yjtime=time+"从"+this.timelist[this.tindex];}
				else if(this.tindex==2){yjtime=time+"从"+this.timelist[this.tindex];}
				else if(this.tindex==3){yjtime=time+"从"+this.timelist[this.tindex];}
				else if(this.tindex==4){yjtime=mtime+"从"+this.timelist[this.tindex];}
				else if(this.tindex==5){yjtime=mtime+"从"+this.timelist[this.tindex];}
				else if(this.tindex==6){yjtime=mtime+"从"+this.timelist[this.tindex];}
				
				let data={
					goods:this.goodslist,
					address:uni.getStorageSync('address'),
					amount:this.pay,
					illustrate:this.illustrate,
					yjtime:yjtime,
					uid:uni.getStorageSync('uid')
				}
				
				if(this.pay<0){
					this.$refs.tips.show({
					  msg: '付款金额不得未0',
					  backgroundColor: '#E83A30',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}else{
					
					this.$http.postRequest('OrderShop/getSign',data )
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
								  // this.tn();
								},
								fail: function(err) {
								  console.log('支付失败',err)
								}
							})
						})
				}
				
				console.log(11,data)
			},
			
			gettime (timestamp) {
			    let date = new Date(timestamp) 
			    let Y = date.getFullYear() + '-'
			    let M =
			        (date.getMonth() + 1 < 10 ?
			            '0' + (date.getMonth() + 1) :
			            date.getMonth() + 1) + '-'
			    let D =
			        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
			
			    return Y + M + D 
			},
			tn(e) {
				
					uni.navigateTo({
						url: e,
					});
				
				
			},
			
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
</style>