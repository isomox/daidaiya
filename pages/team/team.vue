<template>
	<view class="template-home tn-safe-area-inset-bottom">


		<view class="tn-margin-top-sm" >
			<view class="">

				<view class="tn-flex tn-flex-col-center" style="margin: 50rpx 30rpx;" v-for="(item,index) in noticeList"
					:key="index" >
					<view class="">
						<view class="logo-pic">
							<view class="logo-image">
								<view class=""
									:style="'background-image:url('+item.logo+');width: 90rpx;height: 90rpx;background-size: cover;'">
								</view>
							</view>
						</view>
					</view>
					<view class="tn-padding-left-sm" style="width: 80vw">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item">
								<text class="color-tnoa tn-text-lg tn-text-bold">{{item.nickname}}</text>
							</view>

						</view>
						<view class="tn-padding-top-xs tn-text-ellipsis">
							<text class="tn-color-gray">{{item.ctime}}</text>
						</view>
					</view>
					
				</view>

			</view>
			<view v-if="noticeList.length==0" class="wu">
				 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无数据"></tn-empty>
			</view>

		</view>

		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				noticeList: [],
				page: 1,
			}
		},
		onLoad() {
			this.page=1;
			this.noticeList=[];
			this.getlist();
		},
		methods: {
			getlist() {
				let data = {
					page: this.page,
					limit: 20,
					uid: uni.getStorageSync('uid')
				}
				let than = this;
				this.$http.postRequest('User/xcxlist', data)
					.then(res => {
						let list = res.data
						if (list.length > 0) {
							than.page = than.page + 1;
							list.forEach((item) => {
								than.noticeList.push(item)
							});
						}
					})
			},
			onReachBottom(){
				this.getlist();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.template-home {
		max-height: 100vh;
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 45rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}
	}

	/* 自定义导航栏内容 end */

	
	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom));
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}


	// 四个角渐变底色
	.home-fixed {
		position: fixed;
		background: linear-gradient(90deg, #DBF2FE, #FFE1E1);
		top: 0;
		width: 100%;
		transition: all 0.25s ease-out;
		z-index: 100;
	}

	.home-fixed:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
		mask-image: linear-gradient(to bottom, transparent, black);
		background: linear-gradient(90deg, #FFFFFF, #FFFFFF);

	}

	/* OA黑色*/
	.color-tnoa {
		color: #1D2541;
	}

	/* 页面阴影 start*/
	.oa-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}




	/* 图标容器1 start */
	.icon1 {
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
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
				}
			}
		}
	}

	/* 图标容器15 start */
	.icon15 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 90rpx;
				height: 90rpx;
				font-size: 60rpx;
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


				}
			}
		}
	}

	/* 用户头像 start */
	.logo-image {
		width: 90rpx;
		height: 90rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		// border: 1rpx solid rgba(255,255,255,0.05);
		// box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}
	.wu{
		margin-top: 25vh;
	}
</style>