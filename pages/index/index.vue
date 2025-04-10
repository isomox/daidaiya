<template>
	<view class="template-index tn-safe-area-inset-bottom">
		<swiper class="card-swiper" @click="tn('')" :circular="true" 
		  :autoplay="true" duration="500" interval="8000" @change="cardSwiper"> 
		  <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
			<view class="swiper-item image-banner">
			  <image :src="item.image" mode="aspectFill"  ></image>
			</view>
		  </swiper-item>
		</swiper>
		


		<view class="tongzhi"  >
		   <view class="tn-icon-notice">{{tongzhilist}}</view>
		</view>


		<view class="tn-flex tn-margin-xs tn-padding-top-sm tn-margin-top">
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=0')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purplered--light tn-color-purplered">
						<view class="tn-icon-paperbag-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">代买服务</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=1')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-indigo--light tn-color-indigo">
						<view class="tn-icon-commissary-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">快递代取</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=2')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purple--light tn-color-purple">
						<view class="tn-icon-team"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">陪替服务</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=3')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-orange--light tn-color-orange">
						<view class="tn-icon-help-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">急事代办</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="tn-flex tn-margin-xs tn-padding-top-sm">
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=4')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-red--light tn-color-red">
						<view class="tn-icon-education"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">毕业设计</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/order/index?lx=5')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-aquablue--light tn-color-aquablue">
						<view class="tn-icon-iot-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">论文帮扶</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/job/index')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-blue--light tn-color-blue">
						<view class="tn-icon-discover-planet-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">在线兼职</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/print/index')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-cyan--light tn-color-cyan">
						<view class="tn-icon-receipt-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">云打印</text>
					</view>
				</view>
			</view>
		</view>

		<!-- banner start-->
		<view class="tn-flex tn-flex-wrap tn-padding-xs" @click="tn('/pages/errands/errands')">
			<view class="" style="width: 100%;">
				<view class="image-piccapsule tn-shadow-blur"
					style="background-image:url('https://shopimges.oss-cn-hangzhou.aliyuncs.com/source/1700026640248.png');">
					<view class="image-capsule">
					</view>
				</view>
			</view>
		</view>
		<!-- banner end-->


		

		<!-- <view class='tn-tabbar-height'></view> -->
		<tn-tips ref="tips" position="center"></tn-tips>
		<tn-popup v-model="show" mode="center" backgroundColor="#15131305" @close="guanbi">
		  <view class="hongbao" @click="chkan()">
		    <view class="" >
				满<text class="jiage">{{coupon.money}}</text>元减<text class="jiage">{{coupon.sub}}</text>元
			</view>
		  </view>
		</tn-popup>
	</view>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				show:false,
				cardCur: 0,
				isAndroid: true,
				swiperList: [
					{image:"https://shopimges.oss-cn-hangzhou.aliyuncs.com/source/1701313130708.png"},
					{image:"https://shopimges.oss-cn-hangzhou.aliyuncs.com/source/1701319663245.png"},
				],
				cardCur2: 0,
				tongzhilist:"遇到问题及时联系客服反馈，客服看到后会处理",
				
				juanid:0,
				coupon:null
			}
			
		},
		created() {

		},
		onShow() {
			this.getlist();
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// resume
			resume(e) {
				this.cardCur2 = e.detail.current
			},
			// 跳转
			tn(e) {
				if(e){
					uni.navigateTo({
						url: e,
					});
				}else{
					this.$refs.tips.show({
					  msg: '该专区，暂未开放！',
					  backgroundColor: '#E83A30',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}
				
			},
			getlist(){
				if(this.juanid==0){
					this.$http.postRequest('CouponUser/daylist', {
							"uid": uni.getStorageSync('uid')
						})
						.then(res => {
							// this.userData = res.data
							if(res.data.length>0){
								this.coupon=res.data[0];
								this.show=true;
							}
							// console.log(res)
						})
				}
			},
			guanbi(){
				this.juanid=1;
				console.log(111)
			},
			chkan(){
				this.juanid=1;
				this.show=false;
				this.tn('/pages/coupon/coupon');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.template-index {
		max-height: 100vh;
	}

	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
	}



  /* 轮播视觉差 start */
  .card-swiper {
    height: 680rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    // padding: 0rpx 30rpx 90rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    will-change: transform;
  }
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -300rpx;
    text-align: center;
    width: 100%;
    display: block;
    height: 50%;
    border-radius: 10rpx;
    transform: translate(100rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -300rpx;
    width: 100%;
    transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
    will-change: transform;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 100%;
  }
  
  /* 轮播指示点 start*/
  .indication{
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.4;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 0.6;
    width: 30rpx;
    background-color: #FFFFFF;
  }
	/* 简历推荐 start */
	.card-swiper2 {
		height: 420rpx !important;
		overflow: hidden;
	}

	.card-swiper2 swiper-item {
		width: 680rpx !important;
		left: 30rpx;
		box-sizing: border-box;
		overflow: initial;
		padding: 0 0rpx 40rpx 0;
	}

	.card-swiper2 swiper-item .swiper-item1 {
		width: 100%;
		display: block;
		height: 100%;
		transform: scale(0.97);
		transition: all 0.2s ease-in 0s;
		will-change: transform;
		background-color: #E7FAFE;
	}

	.card-swiper2 swiper-item.cur .swiper-item1 {
		transform: none;
		transition: all 0.2s ease-in 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item .swiper-item2 {
		margin-top: -180rpx;
		width: 100%;
		display: block;
		height: 50%;
		border-radius: 50%;
		transform: translate(510rpx, -160rpx) scale(0.9, 0.9);
		transition: all 0.3s ease 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item.cur .swiper-item2 {
		margin-top: -180rpx;
		width: 100%;
		transform: translate(510rpx, -150rpx) scale(0.9, 0.9);
		transition: all 0.3s ease 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item .swiper-item-text {
		margin-top: -270rpx;
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 10rpx;
		transform: translate(30rpx, -20rpx) scale(0.8, 0.8);
		transition: all 0.6s ease 0s;
		will-change: transform;
		overflow: hidden;
	}

	.card-swiper2 swiper-item.cur .swiper-item-text {
		margin-top: -270rpx;
		width: 100%;
		transform: translate(20rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
	}



	/* 底部tabbar假阴影 start*/
	.bg-tabbar-shadow {
		background-image: repeating-linear-gradient(to top, rgba(0, 0, 0, 0.1) 10rpx, #FFFFFF, #FFFFFF);
		position: fixed;
		bottom: 0;
		height: 450rpx;
		width: 100vw;
		z-index: -1;
	}

	/* 图标容器12 start */
	.tn-three {
		position: absolute;
		top: 50%;
		right: 50%;
		bottom: 50%;
		left: 50%;
		transform: translate(-38rpx, -20rpx) rotateX(20deg) rotateY(10deg) rotateZ(-20deg);
		text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
	}

	.icon12 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
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
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);


				}
			}
		}
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 40rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}

		&__search {
			flex-basis: 60%;
			width: 100%;
			height: 100%;

			&__box {
				width: 100%;
				height: 70%;
				padding: 10rpx 0;
				margin: 0 30rpx;
				border-radius: 60rpx 60rpx 0 60rpx;
				font-size: 24rpx;
			}

			&__icon {
				padding-right: 10rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
			}

			&__text {
				// color: #AAAAAA;
			}
		}
	}

	.logo-image {
		width: 65rpx;
		height: 65rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 50%;
	}

	/* 自定义导航栏内容 end */


	/* 热门图片 start*/
	.image-tuniao1 {
		padding: 165rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-tuniao2 {
		padding: 75rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-tuniao3 {
		padding: 90rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 10rpx;
	}

	/* 胶囊banner*/
	.image-capsule {
		padding: 100rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-piccapsule {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 20rpx 20rpx 0 0;
	}

	/* 标题 start */
	.nav_title {
		-webkit-background-clip: text;
		color: transparent;

		&--wrap {
			position: relative;
			display: flex;
			height: 120rpx;
			font-size: 46rpx;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
			background-size: cover;
		}
	}

	/* 标题 end */

	/* 业务展示 start */
	.tn-info {

		&__container {
			margin-top: 10rpx;
			margin-bottom: 50rpx;
		}

		&__item {
			width: 47.7%;
			margin: 15rpx 0rpx 30rpx 0rpx;
			padding: 40rpx 30rpx;
			border-radius: 10rpx;


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
				background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/2.png);
			}

			&__left {

				&--icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					font-size: 40rpx;
					margin-right: 20rpx;
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
						background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
					}
				}

				&__content {
					font-size: 25rpx;

					&--data {
						color: rgba(255, 255, 255, 0.5);
						margin-top: 5rpx;
						// font-weight: bold;
					}
				}
			}

			&__right {
				&--icon {
					position: absolute;
					right: 0rpx;
					top: 50rpx;
					font-size: 100rpx;
					width: 108rpx;
					height: 108rpx;
					text-align: center;
					line-height: 60rpx;
					opacity: 0.15;
				}
			}

			&__bottom {
				box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
				border-radius: 0 0 10rpx 10rpx;
				position: absolute;
				width: 85%;
				line-height: 15rpx;
				left: 50%;
				bottom: -15rpx;
				transform: translateX(-50%);
				z-index: -1;
				text-align: center;
			}
		}
	}

	/* 业务展示 end */

	/* 底部tabbar start*/
	.footerfixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 999;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.tabbar {
		display: flex;
		align-items: center;
		min-height: 110rpx;
		justify-content: space-between;
		padding: 0;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}

	.tabbar .action {
		font-size: 22rpx;
		position: relative;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		overflow: initial;
	}

	.bar-center {
		animation: suspension 3s ease-in-out infinite;
	}

	@keyframes suspension {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-0.8rem);
		}
	}

	.tabbar .action .bar-icon {
		width: 100rpx;
		position: relative;
		display: block;
		height: auto;
		margin: 0 auto 10rpx;
		text-align: center;
		font-size: 42rpx;
		// line-height: 50rpx;
	}

	.tabbar .action .bar-icon image {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
	}

	.tabbar .action .bar-circle {
		position: relative;
		display: block;
		margin: 0rpx auto 0rpx;
		text-align: center;
		font-size: 52rpx;
		line-height: 90rpx;
		// background-color: #01BEFF;
		width: 100rpx !important;
		height: 100rpx !important;
		overflow: hidden;
		// border-radius: 50%;
		// box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
		//   0px -8px 40px rgba(255, 255, 255, 1),
		//   inset 0px -10px 10px rgba(70,23,129, 0.05),
		//   inset 0px 10px 20px rgba(255, 255, 255, 1);
		// box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
	}

	.tabbar .action .bar-circle image {
		width: 100rpx;
		height: 100rpx;
		display: inline-block;
		margin: 0rpx auto 0rpx;
	}

	/* 流星+悬浮 */
	.nav-index-button {
		animation: suspension 3s ease-in-out infinite;
		z-index: 999999;


		&__content {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
				position: relative;
				z-index: 1;
				transform: scale(0.85);

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
					// background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
				}
			}
		}

		&__meteor {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100rpx;
			height: 100rpx;
			transform-style: preserve-3d;
			transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

			&__wrapper {
				width: 100rpx;
				height: 100rpx;
				transform-style: preserve-3d;
				animation: spin 20s linear infinite;
			}

			&__item {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				border-radius: 1000rpx;
				left: 0;
				top: 0;

				&--pic {
					display: block;
					width: 100%;
					height: 100%;
					background: url(https://resource.tuniaokj.com/images/cool_bg_image/arc1.png) no-repeat center center;
					background-size: 100% 100%;
					animation: arc 4s linear infinite;
				}
			}
		}
	}


	@keyframes suspension {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-0.6rem);
		}
	}

	@keyframes spin {
		0% {
			transform: rotateX(0deg);
		}

		100% {
			transform: rotateX(-360deg);
		}
	}

	@keyframes arc {
		to {
			transform: rotate(360deg);
		}
	}
	.tongzhi{
		margin-top: -40rpx;
		position: absolute;
		margin-left: 20rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 4rpx 40rpx 0rpx rgba(43,163,250,0.04);
		width: 710rpx;
		padding:28rpx 24rpx;
		height: 96rpx;
		border-radius: 20rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #6F7C98;
		
	}
	.hongbao{
		background-color: #6e5a5a05;
		background-image: url('https://shopimges.oss-cn-hangzhou.aliyuncs.com/source/1701847962328.png');
		width: 630rpx;
		height: 720rpx;
		background-size:100% 100%; 
		padding: 270rpx 110rpx;
		font-size: 40rpx;
		font-weight: 600;
		text-align: center;
		color: #453e3e;
		letter-spacing: 2rpx;
	}
	.jiage{
		color:red;
		font-size: 60rpx !important;
	}
	
</style>