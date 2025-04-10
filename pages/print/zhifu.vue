<template>
	<view class="oa-content">

		<view class="" >
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				<text v-if="address">{{address.name}} / {{address.phone}} / {{address.address}}</text>
				<text v-if="!address">选择收货地址</text>
				
				<text class="tn-float-right tn-icon-right" @click="tn('/pages/address/address?lx=1')"></text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						待打印文件
					</view>
				</view>
			</view>

			<view class="tn-margin-left tn-margin-right tn-margin-bottom"
				style="background-color: #00C8B008;color: #00C8B0;border-radius: 10rpx;" v-for="(item, index) in filelist"
				:key="index">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
					<view class="justify-content-item tn-text-bold tn-text-left" style="width: 100%;">
						<view class="">
							<text class="">{{item.filename}} </text>
						</view>
						<view class="tn-padding-top-xs tn-text-sm">
							<text class="tn-icon-folder-fill "></text>
							<text class="tn-padding-left-xs">
								{{item.page}}页、{{item.paper==1?"A3":"A4"}}、{{item.weight==1?"80g":"70g"}}、{{item.mian==1?"双面":"单面"}}、{{item.zhuang==1?"订书针装订":"不需装订"}}
								
							</text>
							
						</view>
						<view class="tn-padding-top-xs tn-text-sm">
							<text class="tn-padding-left-xs tn-color-orange">共：{{item.yemun}}份 ¥ {{item.pay}}</text>
							
						</view>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				总价
				<text class="tn-float-right tn-color-orange">¥ {{pay}}</text>
			</view>
			<view class="zhushi ">
				<text class="tn-icon-tip-fill"></text>
				订单不足12元按12元收取，和他人一起拼单更划算
			</view>
			
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				
				<tn-radio-group v-model="value" @change="radioGroupChange">
				      <tn-radio  name="1">
				        阅读并同意<text class="tn-color-orange">《图文制作须知及委托加工协议》</text>
				      </tn-radio>
				    </tn-radio-group>
			</view>
			<view class="tn-padding-left tn-padding-right tn-color-red">
				特别提醒:图文打印居于定制类产品，一经制作不支持无理由返换
			</view>


			<!-- 悬浮按钮-->
			<view class="tn-flex tn-padding">
				<view class="tn-flex-1 justify-content-item tn-text-center">
					<tn-button backgroundColor="#ffaa7f " padding="40rpx 0" width="100%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" @click="zhifu()">
						<text class="">立即支付</text>
					</tn-button>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateCost',
		mixins: [template_page_mixin],
		data() {
			return {
				value:0,
				guizelist:null,
				filelist:null,
				pay:0,
				address:null
			}
		},
		onShow() {
			
			this.address=uni.getStorageSync('address')
			this.bianli();
		},
		methods: {
			bianli(){
				let _this=this;
				let filelist=uni.getStorageSync('filelist');
				let arr=[];
				let array = [1, 2, 3, 4, 5];
				let jiage=0;
				filelist.forEach((item, index) => {
				  // console.log(item);
				  let pay=_this.getjiage(item)
				  jiage=jiage+pay;
				  arr.push({
					  filename:item.filename,
					  fileurl:item.fileurl,
					  page:item.page,
					  paper:item.paper,
					  weight:item.weight,
					  mian:item.mian,
					  zhuang:item.zhuang,
					  yemun:item.yemun,
					  pay:pay/100
				  })
				  console.log("pay",pay);
				});
				this.filelist=arr;
				if(jiage<1200){
					this.pay=12;
				}
			},
			getjiage(e){
				let guizelist=uni.getStorageSync('guizelist');
				 for (const item of guizelist) {
				   if (e.paper === item.paper){
					   let pay=0;
					   let  yeshu=0;
					   if(e.mian==0){
						   yeshu=e.page;
						   if(e.page<=item.pages){
							   pay=item.onePay;
						   }else{
							   pay=item.onePayS;
						   }
					   }else{
						   yeshu=Math.round(e.page/2);
						   if(e.page<=item.pages){
						   		pay=item.twoPay;					   
						   }else{
						   		pay=item.twoPayS;					   
						   }
					   }
					   
					   if(e.weight==1){
						   pay=pay+item.pay;
					   }
					   let jiage=pay*yeshu;
					   
					   if(e.zhuang==1){
					   		if(yeshu<31){
								jiage=jiage+2
							}
					   }
					   console.log(jiage*e.yemun)
					   return jiage*e.yemun;
					   break;
				   }  
				 }
			},
			zhifu(){
				console.log(this.value)
				let data={
						schoolid:uni.getStorageSync('school').id,
						schoolname:uni.getStorageSync('school').title,
						province:uni.getStorageSync('school').province,
						market:uni.getStorageSync('school').market,
						name:this.address.name,
						phone:this.address.phone,
						address:this.address.address,
						amount:this.pay,
						filelist:this.filelist,
						uid:uni.getStorageSync('uid'),
						
					}
					// console.log(data)
					this.$http.postRequest('PrintingOrder/getSign',data )
						.then(res => {
							uni.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(itme) {
									uni.removestoragesync('filelist');
								  uni.switchTab({
								  	url:'/pages/index/index'
								  })
								  
								},
								fail: function(err) {
								  console.log('支付失败',err)
								}
							})
						})
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	

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
	.xuan{
		background-color: #ffaa7f;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}
	.wei{
		background-color: #949494;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}
	.zhushi{
		padding: 0 30rpx;
		color: #ffaa7f;
		padding-bottom: 10rpx;
	}
</style>
