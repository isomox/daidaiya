<template>
	<view class="oa-content">
		<view class="top-fixed">
			<tn-subsection :list="list" mode="button" :borderRadius="50" animationType="cubic-bezier" @change="change"></tn-subsection>
		</view>
		<view style="margin-top: 80rpx; margin-bottom: 80rpx;">
			<view class="">
				<view v-for="(item,index) in noticeList" :key="index" class="order__item" @click="tn(item.id)">
					<view
						class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
						<view class="order__item__head__title">
							<text class="">订单编号：{{item.number}}</text>
						</view>
					</view>

					<view
						class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
						<view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
							<view class="order__item__content__image">
								<image
									src="https://benbentg.oss-cn-beijing.aliyuncs.com/source/1706272594427.png"
									mode="aspectFill"></image>
							</view>
							<view >
								<view class="order__item__content__title" v-for="(iem,indx) in item.filelist" :key="indx" v-if="indx<3">{{iem.filename}}</view>
							</view>
							
						</view>
						<view
							class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
							<view class="order__item__content__info__price">
								<text class="order__item__content__info__price--unit">￥</text>
								<text class="order__item__content__info__price__value--integer">{{item.amount}}</text>
								<!-- <text class="order__item__content__info__price__value--decimal"></text> -->
							</view>
							<!-- <view class="order__item__content__info__count">
								<text>共1件</text>
							</view> -->
						</view>
					</view>

					<view
						class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
						<view class="order__item__operaation__left tn-text-sm" style="opacity: 0.5;">
							<text class="tn-icon-time tn-padding-right-xs"></text>
							<text class="">{{item.ctime}}</text>
						</view>
						<!-- <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
							<view class="order__item__operation__right__button">
							  <tn-button backgroundColor="#444" padding="10rpx 18rpx" height="auto" width="100%" :fontSize="22" :plain="true" fontColor="#444" shape="round" @click="tn('../delivery/delivery')">
								取消订单
							  </tn-button>
							</view>
							<view class="order__item__operation__right__button">
							  <tn-button backgroundColor="#ff557f" padding="10rpx 18rpx" height="auto" width="100%" :fontSize="22" :plain="true" fontColor="#ff557f" shape="round" @click="tn('')">
								立即支付
							  </tn-button>
							</view>
						  </view> -->
					</view>
				</view>
				<view v-if="noticeList.length==0" class="wu">
					 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无数据"></tn-empty>
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
				list: ['待打印', '待收货', '已送达', '已驳回'],
				status:0,
				page: 1,
				noticeList: [],
			}
		},
		onShow() {
			this.page=1;
			this.noticeList=[];
			this.getlist();
		},
		methods: {
			change(e){
				this.status=e.index;
				this.page=1;
				this.noticeList=[];
				this.getlist();
				console.log(e)
			},
			getlist() {
				let data = {
					page: this.page,
					limit: 20,
					uid: uni.getStorageSync('uid'),
					status: this.status+1
				}
				let than = this;
				this.$http.postRequest('PrintingOrder/xcxlist', data)
					.then(res => {
						console.log(res)
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
			tn(e){
				uni.navigateTo({
					url:"./details?id="+e
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.wu{
		margin-top: 25vh;
	}
	.top-fixed{
	    position: fixed;
	    top: 0;
	    width: 100%;
	    transition: all 0.25s ease-out;
	    z-index: 100;
	  }
	.tn-strip-top {
		width: 100%;
		border-top: 20rpx solid rgba(241, 241, 241, 0.8);
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
			color: #424242;
			margin: 30rpx;
			padding: 36rpx 26rpx;
			border-radius: 15rpx;
			border: 1rpx solid #dce2f3;
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
					color: #AAAAAA;
				}
			}

			/* 头部 end */

			/* 内容 start */
			&__content {

				margin-top: 20rpx;

				&__image {
					margin-right: 20rpx;

					image {
						width: 80rpx;
						height: 100rpx;
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
					-webkit-line-clamp: 1;
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
	}
		/* 订单内容 end */
</style>
