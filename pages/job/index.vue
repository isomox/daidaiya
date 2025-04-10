<template>
	<view class="oa-content">


		<view class="tn-padding-bottom-xl" :style="{paddingTop: vuex_custom_bar_height  -60 +'px'}">
			<view class="">
				<view class="content-bg tn-margin tn-padding" style="position: relative;"
					v-for="(item, index) in noticeList" :key="index" @click="tn(item.id)">
					<view class="oa-blue"
						style="width: 15rpx;height: 100%;position: absolute;top: 0;left:0;border-radius: 15rpx 0 0 15rpx;font-size: 32rpx;">
					</view>
					<view class="tn-margin-left-xs">
						<view class="tn-flex tn-flex-col-center tn-flex-row-between" style="margin-top: -6rpx;">
							<view
								class="justify-content-item tn-flex tn-flex tn-flex-col-center tn-text-lg tn-text-bold">
								<view class="justify-content-item">
									{{ item.title }}
								</view>
								
							</view>
							<view class="justify-content-item tn-color-gray">
								{{ item.pay }}元/{{ item.lx==0?"小时":item.lx==1?"天":item.lx==2?"周":item.lx==3?"月":"次" }}
							</view>
						</view>
						<view class="tn-text-justify clamp-text-1 tn-padding-top-xs tn-color-gray--dark">
							{{ item.address }}
						</view>

					</view>

				</view>
			</view>
			<view v-if="noticeList.length==0" class="wu">
				 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无兼职"></tn-empty>
			</view>
		</view>

		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplatePending',
		mixins: [template_page_mixin],
		data() {
			return {
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
			
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: './details?id='+e,
				});
			},
			
			getlist() {
				let data = {
					page: this.page,
					limit: 20,
					schoolid: uni.getStorageSync('school').id,
					uid: uni.getStorageSync('uid')
				}
				let than = this;
				this.$http.postRequest('PartJob/xcxlist', data)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wu{
		margin-top: 25vh;
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

	/* 新增OA色系，自行调用，或者拿色值去用，多种方式*/
	.oa-black {
		color: #1D2541;
		background-color: #1D2541;
	}

	.oa-blue {
		color: #4B98FE;
		background-color: #4B98FE;
	}

	.oa-orangeyellow {
		color: #FFAC00;
		background-color: #FFAC00;
	}

	.oa-green {
		color: #00D05E;
		background-color: #00D05E;
	}

	.oa-orange {
		color: #FE871B;
		background-color: #FE871B;
	}

	.oa-cyan {
		color: #00C8B0;
		background-color: #00C8B0;
	}

	.oa-indigo {
		color: #00B9FE;
		background-color: #00B9FE;
	}

	.oa-orangered {
		color: #FB6A67;
		background-color: #FB6A67;
	}

	.oa-purple {
		color: #957BFE;
		background-color: #957BFE;
	}
	.oa-dark {
		color: #AAAAAA;
		background-color: #E6E6E6;
	}
	.oa-content {
		background-color: #F8F7F8;
		min-height: 100vh;
		padding-bottom: 60rpx;
		padding-bottom: calc(80rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(80rpx + constant(safe-area-inset-bottom));
	}

	.top-fixed {
		position: fixed;
		background-color: rgba(255, 255, 255, 1);
		top: 0;
		width: 100%;
		transition: all 0.25s ease-out;
		z-index: 100;
	}

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

	/* 背景阴影 start*/
	.content-bg {
		border-radius: 15rpx;
		background-color: #FFFFFF;
		// box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	/* 用户头像 start */
	.user-image {
		width: 35rpx;
		height: 35rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}

	.user-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 1rpx solid rgba(255, 255, 255, 0.05);
		box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 标签 start*/
	.tag-state {
		display: inline-block;
		padding: 8rpx 12rpx 6rpx;
		margin: 12rpx 15rpx 15rpx 10rpx;
		border-radius: 10rpx;
	}
	.tn-color-gray{
		color: #FB6A67 !important;
		font-weight: 600;
	}
</style>