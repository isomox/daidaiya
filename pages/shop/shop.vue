<template>
	<view class="tn-safe-area-inset-bottom">

		<view class="tn-text-center" style="padding:0 20rpx">

			<!-- 发展历程 start-->
			<view class="tn-flex tn-flex-wrap tn-padding-bottom">
				<view class="king-list tn-margin-top-sm" v-for="(item, index) in noticeList" :key="index">
					<view class=' tn-color-red'>
						<view class="article-shadow tn-bg-white" @click="tn(item)">
							<view class="tn-flex">
								<view class="image-pic tn-margin-left-sm tn-margin-top-sm tn-margin-bottom-sm img-solid"
									:style="'background-image:url('+item.image+');width: 160rpx;height: 160rpx;background-size: cover;'">
									<view class="image-article">
									</view>
								</view>
								<view class="tn-margin-sm tn-padding-top-xs" style="width: 490rpx;">
									<view class="" style="min-height: 105rpx;">
										<text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
											{{item.title}}
										</text>
										<text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
											{{item.position}}
										</text>
										
										
									</view>
									<view class="tn-flex tn-flex-row-between tn-flex-col-between">
										<view v-if="item.trade==0"
											class="justify-content-item tn-tag-content__item tn-margin-right tn-text-sm tn-text-bold">
											<text class="tn-tag-content__item--prefix">#</text> 店铺休息
										</view>
										<view v-if="item.trade==1"
											class="justify-content-item tn-tag-content__item tn-margin-right tn-text-sm tn-text-bold zhityanse">
											<text class="tn-tag-content__item--prefix ">#</text> 正常营业
										</view>
										<tn-rate v-model="item.score" :allowHalf="true" :disabled="true"></tn-rate>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 比例图文 end-->

		</view>
		<view v-if="noticeList.length==0" class="wu">
			<tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无商家信息"></tn-empty>
		</view>
		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		data() {
			return {
				noticeList: [],
			}
		},
		onShow() {
			this.getlist();
		},
		methods: {
			getlist() {
				let data = {
					schoolid: uni.getStorageSync('school').id
				}
				let than = this;
				this.$http.postRequest('Shop/xcxlist', data)
					.then(res => {
						than.noticeList = res.data

					})
			},
			// 跳转
			tn(e) {
				if(e.trade==1){
					uni.navigateTo({
						url: '/pages/goods/index?id='+e.id,
					});
				}else{
					this.$refs.tips.show({
					  msg:"商铺休息，不可点餐" ,
					  backgroundColor: '#FB6A67',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wu {
		margin-top: 25vh;
	}


	/* 简历内容 */
	.king-list {
		display: block;
		// background-color: #ffffff;
	}

	.king-list .king-icon {
		width: 100%;
		text-align: left;
		padding: 20rpx 0 20rpx 37rpx;
		font-size: 26rpx;
		color: #888;
		display: block;
	}

	.king-list>.king-item {
		padding: 30rpx 30rpx 30rpx 120rpx;
		position: relative;
		display: block;
		z-index: 0;
	}

	.king-list>.king-item::after {
		content: "";
		display: block;
		position: absolute;
		width: 1rpx;
		background-color: #E6E6E6;
		left: 60rpx;
		height: 100%;
		top: 0;
		z-index: 8;
	}

	.king-list>.king-item::before {
		display: block;
		position: absolute;
		top: 36rpx;
		z-index: 9;
		background-color: #ffffff;
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		border: none;
		line-height: 50rpx;
		left: 36rpx;
	}


	/* 名片微调 */
	.img-solid {
		border: 1rpx solid #eee;
	}

	.share-img {
		position: fixed;
		/* padding: 10rpx; */
		width: 100rpx;
		height: 100rpx;
		/* top: 680rpx; */
		bottom: 200rpx;
		right: 20rpx;
		z-index: 1024;
		opacity: 0.8;
		box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
		border: none;
		border: 6rpx solid rgba(255, 255, 255, 0);
	}

	.resume {
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		border-radius: 6rpx;
		color: #666;
		line-height: 1.6;
	}

	.resume+.resume {
		margin-top: 20rpx;
	}

	.resume2 {
		padding-top: 10rpx;
		border-radius: 6rpx;
		display: block;
		color: #666;
		line-height: 1.6;
		text-align: justify;
	}

	/* 间隔线 start*/
	.tn-strip-bottom {
		width: 100%;
		border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/


	.bg-img-cont {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 350rpx;
		margin: 20rpx 0;
		border-radius: 8rpx;
	}



	// .button-no {
	//   border: none;
	//   width: 100%;
	//   height: 100%;
	//   background-color: rgba(0, 0, 0, 0);
	// }


	/* 标签内容 start*/
	.tn-tag-content {
		&__item {
			display: inline-block;
			line-height: 35rpx;
			color: #1D2541;
			background-color: #F3F2F7;
			border-radius: 10rpx;
			font-size: 22rpx;
			padding: 5rpx 15rpx;

			&--prefix {
				padding-right: 10rpx;
			}
		}
	}

	/* 标签内容 end*/

	.see {
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		border-radius: 6rpx;
		color: #666;
		line-height: 1.6;
	}



	@keyframes tiger {

		0%,
		100% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(-0.8rem, 1rem);
		}
	}

	.login {
		position: relative;
		height: 100%;
		z-index: 1;

		/* 背景图片 start */
		&__bg {
			z-index: -1;
			position: fixed;

			&--top {
				top: 0;
				left: 0;
				right: 0;
				width: 100%;

				.bg {
					width: 750rpx;
					will-change: transform;
				}

				.rocket {
					margin: 50rpx 30%;
					width: 300rpx;
					will-change: transform;
				}
			}

			&--bottom {
				bottom: -10rpx;
				left: 0;
				right: 0;
				width: 100%;
				// height: 144px;
				// margin-bottom: env(safe-area-inset-bottom);

				image {
					width: 750rpx;
					will-change: transform;
				}
			}
		}
	}

	/* 背景图片 end */

	.article-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	/* 资讯主图 start*/
	.image-article {
		border-radius: 8rpx;
		border: 1rpx solid #F8F7F8;
		width: 160rpx;
		height: 160rpx;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 10rpx;
	}

	// .article-shadow {
	//   border-radius: 15rpx;
	//   box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	// }

	/* 文字截取*/
	.clamp-text-1 {
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.clamp-text-2 {
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/* 标签内容 start*/
	.tn-tag-content {
		padding-right: 10rpx;
		display: inline-block;
		line-height: 35rpx;
		padding: 5rpx 25rpx;
	}
	.zhityanse{
		color: #3D7EFF !important;
	}
</style>