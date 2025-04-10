<template>
	<view class="mine tn-safe-area-inset-bottom">



		<view class="top-backgroup">
			<image src='https://resource.tuniaokj.com/images/my/my-bg4.png' mode='widthFix' class='backgroud-image'>
			</image>
		</view>

		<view class="about__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			<!-- 图标logo/头像 -->
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom" style="margin-top: -450rpx;">
				<view class="justify-content-item">
					<view class="tn-flex tn-flex-col-center tn-flex-row-left">
						<view class="logo-pic tn-shadow">
							<view class="logo-image">
								<view class="tn-shadow-blur"
									:style="'background-image:url('+userData.logo+');width: 110rpx;height: 110rpx;background-size: cover;'">
								</view>
							</view>
						</view>
						<view class="tn-padding-right">
							<view class="tn-padding-right tn-padding-left-sm">
								<text class="tn-color-cat tn-text-xl tn-text-bold">{{userData.nickname}}</text>
								<!-- <text class=" tn-round tn-text-xs tn-bg-red tn-color-white tn-margin-left-sm" style="padding: 10rpx 20rpx;" @click="tn('/minePages/realname')">
                  未实名
                </text> -->
							</view>
							<view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">
								<text class="tn-color-gray">{{userData.career==null ?"":userData.career}}</text>
								<text class="tn-color-gray tn-padding-left-sm tn-text-sm">UUID:YCXF09021{{userData.id}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="justify-content-item" @click="tn('./set')">
					<view class="tn-icon-right tn-color-gray">
					</view>
				</view>
			</view>



			<view class="tn-margin-top-xl">
				<view class="button-vip tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur"
					style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">

					<view class="tn-margin-left">
						<view class='title' style="color: #F1C68E;">
							<text class="tn-text-bold tn-text-xl">专项用户</text>
							<!-- <text class="tn-icon-vip-text tn-text-center" style="position: absolute;margin: -22rpx 0 0 0;font-size: 92rpx;"></text> -->
						</view>
						<view class='tn-color-white tn-text-sm tn-padding-top-sm'>会员福利，助力事业一骑绝尘</view>
					</view>
					<view class="tn-margin-right">
						<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
							width="160rpx" @click="tn('/pages/member/member')">
							<!-- <text class="tn-icon-vip tn-padding-right-sm tn-text-lg"></text> -->
							<text class="tn-text-bold">权 益</text>
						</tn-button>
					</view>

				</view>
			</view>

			<!-- 方式15 start-->
			<!-- <view class="tn-flex tn-flex-row-between tn-bg-white about-shadow tn-margin-top-xl">
        <view class="tn-padding-sm tn-margin-xs" @click="tn('/discoveryPages/edit')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-left">
            <view class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-color: #F3F2F7;color: #7C8191;">
              <view class="tn-icon-discover"></view>
            </view>  
            <view class="tn-text-center">
              <text class="tn-text-ellipsis">发闲置</text>
            </view>
          </view>
        </view>
        <view class="tn-padding-sm tn-margin-xs" @click="tn('/circlePages/circle')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-color: #F3F2F7;color: #7C8191;">
              <view class="tn-icon-topics"></view>
            </view>  
            <view class="tn-text-center">
              <text class="tn-text-ellipsis">晒帖子</text>
            </view>
          </view>
        </view>
        <view class="tn-padding-sm tn-margin-xs" @click="tn('/minePages/withdraw')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-right">
            <view class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-color: #F3F2F7;color: #7C8191;">
              <view class="tn-icon-money"></view>
            </view>  
            <view class="tn-text-center">
              <text class="tn-text-ellipsis">去提现</text>
            </view>
          </view>
        </view>
      </view> -->
			<!-- 方式15 end-->



			<!-- 更多信息-->
			<!-- 方式12 start-->
			<view class="about-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm tn-bg-white">
				<view class="tn-flex tn-flex-row-center tn-radius tn-padding-top">
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/team/team')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-team tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">我的团队</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/shop/list')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-cart tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">我的团购</text>
							</view>
						</view>
					</view>
					<!-- <view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-trophy tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">我的项目</text>
							</view>
						</view>
					</view> -->
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/withdraw/withdraw')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-pay tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">我的钱包</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/address/address')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-map tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">收货地址</text>
							</view>
						</view>
					</view>
				</view>
				<view class="tn-flex tn-flex-row-center tn-radius tn-padding-top">
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/coupon/coupon')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-coupon tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">我的卡包</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/notice/index')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-notice tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">消息通知</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pages/about/about')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-safe tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">使用协议</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="callPhoneNumber(telephone)">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
								<view class="tn-icon-service tn-color-cat"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">校园大使</text>
							</view>
						</view>
					</view>
				</view>
			</view>



			<view class="about-shadow tn-margin-top-lg tn-margin-bottom-lg tn-padding-top-sm tn-padding-bottom-sm">
				<!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" @click="tn('/pages/about/about')">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-safe-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">协议通知</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell> -->
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="contact">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-service-simple-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">在线客服</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="contact">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-wechat-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">合作勾搭</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="feedback">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-message-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">问题反馈</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="callPhoneNumber('13476865273')"
					>
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-tel-circle-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1">技术支持</view>
						<view
							class="tn-margin-left-sm tn-color-cat tn-text-sm tn-padding-left-xs tn-padding-right-xs tn-bg-gray--light tn-round">
							134****7686</view>
					</view>
				</tn-list-cell>
				<!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="callPhoneNumber(telephone)" v-if="telephone"
					>
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-service"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1">校园负责人</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell> -->
			</view>

		</view>

		<view class='tn-tabbar-height'></view>
		<tn-tips ref="tips" position="center" ></tn-tips>
	</view>
</template>

<script>
	export default {
		name: 'Mine',
		data() {
			return {
				userData:null,
				telephone:null
			}
		},
		onShow() {
			this.getuser();
			this.gettelephone();
		},
		methods: {
			getuser(){
				this.$http.postRequest('User/ByData', {
					"id": uni.getStorageSync('uid')
				})
				.then(res => {
					this.userData=res.data
					// console.log(res)
				})
			},
			gettelephone(){
				this.$http.postRequest('SchoolUser/telephone', {
					"schoolid": uni.getStorageSync('school').id
				})
				.then(res => {
					if(res.code==200){
						this.telephone=res.data
					}else{
						this.telephone=null
					} 
					
				})
			},
			// 跳转到图鸟官网
			navTuniaoWebsite() {
				uni.navigateToMiniProgram({
					appId: 'wxa698b1eee960632f'
				})
			},

			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},


			//拨打固定电话
			callPhoneNumber(e) {
				console.log(e)
				if(e==null || e==""){
					this.$refs.tips.show({
					   msg: "此学校负责人，请联系客服",
					   backgroundColor: '#E83A30',
					   fontColor: '#FFFFFF',
					   duration: 1500
					 })
				}else{
					uni.makePhoneCall({
						phoneNumber: e,
					});
				}
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		max-height: 100vh;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}

	.tn-color-cat {
		color: #1D2541;
	}

	.tn-bg-cat {
		background-color: #1D2541;
	}


	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 40rpx;
			margin-right: 10rpx;
			flex-basis: 5%;
			width: 100rpx;
			position: absolute;
		}
	}

	/* 自定义导航栏内容 end */


	/* 顶部背景图 end */


	/* 用户头像 start */
	.logo-image {
		width: 110rpx;
		height: 110rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
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

	/* 页面 start*/
	.about-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.about {

		&__wrap {
			position: relative;
			z-index: 1;
			margin: 20rpx 30rpx;
		}
	}

	/* 页面 end*/

	/* 图标容器15 start */
	.icon15 {
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


				}
			}
		}
	}

	/* 图标容器12 start */
	.tn-three {
		position: absolute;
		top: 50%;
		right: 50%;
		bottom: 50%;
		left: 50%;
		transform: translate(-38rpx, -16rpx) rotateX(30deg) rotateY(20deg) rotateZ(-30deg);
		text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
	}

	.icon20 {
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
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
				}
			}
		}
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


	/* 图标容器12 start */
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
				width: 15rpx;
				height: 15rpx;
				font-size: 50rpx;
				border-radius: 50%;
				margin-bottom: 38rpx;
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

				}
			}
		}
	}

	/* 图标容器1 start */
	.icon1 {
		&__item {
			// width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 40rpx;
				height: 40rpx;
				font-size: 40rpx;
				border-radius: 50%;
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
		}
	}

	/* 图标容器1 end */


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
</style>