<template>
	<view class="template-order tn-safe-area-inset-bottom">

		

		<view class="" >
			<view v-for="(item,index) in noticeList" :key="index" class="order__item" @click="tn('/pages/shop/order?id='+item.id)">
				<view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
					<view class="order__item__head__title">
						<text class="">订单编号：{{item.number}}</text>
						<text class="tn-icon-copy tn-text-sm tn-padding-left-sm" style="opacity: 0.5;"></text>
					</view>
				</view>

				<view
					class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
					<view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
						<view class="order__item__content__image" v-for="(it,ind) in item.orderShopGoods" :key="ind" v-if="ind<3">
							<image :src="it.mainimage" mode="aspectFill"></image>
						</view>
						
					</view>
					<view
						class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
						<view class="order__item__content__info__price">
							<text class="order__item__content__info__price--unit">￥</text>
							<text class="order__item__content__info__price__value--integer">{{item.amount}}</text>
							<!-- <text class="order__item__content__info__price__value--decimal">.00</text> -->
						</view>
						<view class="order__item__content__info__count">
							<text>共{{item.orderShopGoods.length}}件</text>
						</view>
					</view>
				</view>

				<view
					class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
					<view class="order__item__operaation__left tn-text-sm" style="opacity: 0.5;">
						<text class="tn-icon-time tn-padding-right-xs"></text>
						<text class="">{{item.ytime}}</text>
					</view>
					<view
						class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
						<view class="order__item__operation__right__button">
							<tn-button   padding="10rpx 18rpx" height="auto" width="100%"
								:fontSize="22" :plain="true"   shape="round"
								>
								{{item.status==1?"商家待接单":item.status==2?"商家备货中":item.status==3?"派送中":item.status==4?"已送达":item.status==9?"订单取消":"已签收"}}
							</tn-button>
						</view>
					</view>
				</view>
			</view>
			<view v-if="noticeList.length==0" class="wu">
				 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无数据"></tn-empty>
			</view>
		</view>
		

		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateOrder',
		mixins: [template_page_mixin],
		data() {
			return {
				page: 1,
				current: 2,
				noticeList: [],
			}
		},
		onLoad() {
			this.page=1;
			this.noticeList=[];
			this.getlist();
		},
		methods: {
			// tab选项卡切换
			tabChange(index) {
				this.current = index
			},
			getlist() {
				let data = {
					page: this.page,
					limit: 20,
					uid: uni.getStorageSync('uid')
				}
				let than = this;
				this.$http.postRequest('OrderShop/xcxlist', data)
					.then(res => {
						let list = res.data
						// console.log(res)
						// console.log(11,list.length)
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
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		}
	}
</script>

<style lang="scss" scoped>
	.template-order {}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 40rpx;
		height: calc(60rpx + env(safe-area-inset-bottom) / 2);
		height: calc(60rpx + constant(safe-area-inset-bottom));
	}

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
		border-radius: 100rpx;
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

	.top-fixed {
		position: fixed;
		top: 0;
		width: 100%;
		transition: all 0.25s ease-out;
		z-index: 100;
	}


	.order {
		&--wrap {
			position: fixed;
			left: 0;
			right: 0;
			width: 100%;
			background-color: inherit;
		}

		/* 导航栏 start */
		&__tabs {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			background-color: inherit;
		}

		/* 导航栏 end */

		/* 订单内容 start */
		&__item {
			// color: #FFFFFF;
			margin: 30rpx;
			padding: 36rpx 26rpx;
			border-radius: 15rpx;
			border: 1rpx solid #494B51;
			background-color: rgba(255, 255, 255, 0.08);
			border-radius: 15rpx;
			// box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);

			&:first-child {
				margin-top: 40rpx;
			}

			&:last-child {
				margin-bottom: 0;
			}

			/* 头部 start */
			&__head {

				&__title {
					font-weight: bold;
					line-height: normal;

					&--right-icon {
						font-size: 24rpx;
						margin-left: 8rpx;
					}
				}

				&__status {
					font-size: 22rpx;
					// color: #AAAAAA;
				}
			}

			/* 头部 end */

			/* 内容 start */
			&__content {

				margin-top: 20rpx;

				&__image {
					margin-right: 20rpx;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 10rpx;
					}
				}

				&__title {
					padding-right: 40rpx;
					display: -webkit-box;
					overflow: hidden;
					white-space: normal !important;
					text-overflow: ellipsis;
					word-wrap: break-word;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				&__info {

					&__price {
						&--unit {
							font-size: 20rpx;
						}

						&__value--integer,
						&__value--decimal {
							font-weight: bold;
						}

						&__value--decimal {
							font-size: 20rpx;
						}
					}

					&__count {
						color: #AAAAAA;
						font-size: 24rpx;
					}
				}
			}

			/* 内容 end */

			/* 操作按钮 start */
			&__operation {
				margin-top: 20rpx;

				&__right {
					&__button {
						margin-left: 10rpx;
					}
				}
			}

			/* 操作按钮 end */
		}

		/* 订单内容 end */
	}
</style>