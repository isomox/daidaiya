<template>
	<view class="template-address">


   
		<view class="">
			<view  v-for="(itme,index) in list" :key="index"
				class="box-shadow tn-flex tn-flex-row-between tn-flex-col-center tn-strip-bottom-min tn-padding tn-margin">
				<view class="justify-content-item tn-padding-right" @click="huancun(itme)">
					<view class="tn-text-bold tn-text-lg ">	
						<text class="tn-padding-left-sm">{{itme.title}}</text>
					</view>
				</view>
			</view>
			<view 
				class="box-shadow tn-flex tn-flex-row-between tn-flex-col-center tn-strip-bottom-min tn-padding tn-margin">
				<view class="justify-content-item tn-padding-right" >
					<view class="tn-text-bold tn-text-lg ">
						<!-- <text class="">
							1
						</text> -->
						<tn-input  v-model="title" placeholder="输入快递商家"></tn-input>
					</view>
				</view>
				<view class="justify-content-item tn-text-xl tn-color-gray" @click="baocun">
					<view class="tn-icon-upload"></view>
				</view>
			</view>
			

			<!-- 悬浮按钮-->
			


		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateAddress',
		mixins: [template_page_mixin],
		data() {
			return {
				name:"",
				lx:0,
				list:[],
				title:""
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			this.getlist()
		},
		methods: {
			getlist(){
				this.$http.postRequest('ExpressDelivery/xcxList', {schoolid:uni.getStorageSync('school').id})
					.then(res => {
						this.list = res.data
					})
			},
			huancun(itme){
				
				uni.setStorageSync("kuaidi", itme.title)
				uni.navigateBack({
					delta:1,
				})
				
			},
			baocun(){
				uni.setStorageSync("kuaidi", this.title)
				uni.navigateBack({
					delta:1,
				})
			}
}
	}
</script>

<style lang="scss" scoped>
	

	/* 页面阴影 start*/
	.box-shadow {
		border-radius: 15rpx;
		border: 1rpx solid #d9dff0;
		background-color: rgba(255, 255, 255, 0.08);
		// box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}


</style>