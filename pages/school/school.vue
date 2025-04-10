<template>
	<view class="template-address">


    <view class="tn-search-fixed"  >
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
        
        <view class="justify-content-item align-content-item" style="width: 100vw;">
          <view class="tn-flex tn-flex-col-center" style="border: 1rpx solid #d9dff0;border-radius: 100rpx;padding: 10rpx 20rpx 10rpx 20rpx;">
            <text class="tn-icon-search justify-content-item tn-padding-right-xs tn-color-gray tn-text-lg"></text>
            <input class="justify-content-item" placeholder="输入学校名称" name="input" v-model="name" placeholder-style="color:#AAAAAA" @confirm="getlist"></input>
          </view>
        </view>
        
        
      </view>
    </view>
		<view class="">
			<view  v-for="(itme,index) in list" :key="index"  @click="huancun(itme)"
				class="box-shadow tn-flex tn-flex-row-between tn-flex-col-center tn-strip-bottom-min tn-padding tn-margin">
				<view class="justify-content-item tn-padding-right">
					<view class="tn-text-bold tn-text-lg ">	
						<text class="tn-padding-left-sm">{{itme.title}}</text>
					</view>
				</view>
			</view>
			
			

			<!-- 悬浮按钮-->
			<view class="tn-flex tn-footerfixed">
				<view class="tn-flex-1 justify-content-item tn-margin-right tn-margin-left tn-text-center">
					<tn-button backgroundColor="#07C160 " padding="40rpx 0" width="100%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" open-type="contact">
						<text class="">添加学校</text>
					</tn-button>
				</view>
			</view>


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
				list:[]
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			this.getlist()
		},
		methods: {
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			getlist(){
				this.$http.postRequest('School/xcxList', {name:this.name})
					.then(res => {
						this.list = res.data
					})
			},
			huancun(itme){
				this.$http.postRequest('User/update', {
					id:uni.getStorageSync('uid'),
					schoolid:itme.id
				})
				.then(res => {
					uni.setStorageSync("school", itme)
					uni.switchTab({
						url:'/pages/index/index'
					})
					// uni.navigateBack({
					// 	delta:1,
					// })
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

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 160rpx;
		height: calc(180rpx + env(safe-area-inset-bottom) / 2);
		height: calc(180rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(80rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/
</style>