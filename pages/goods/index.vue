<template>
	<view class="pages-b">


		<view class="tn-classify__wrap">

			<!-- 搜索框 -->
			<view class="tn-classify__search--wrap">

			</view>

			<!-- 分类列表和内容 -->
			<view class="tn-classify__container">
				<view class="tn-classify__container__wrap tn-flex tn-flex-nowrap tn-flex-row-around tn-bg-white">
					<!-- 左边容器 -->
					<scroll-view class="tn-classify__left-box left-width tn-bg-gray--light"
						:scroll-top="leftScrollViewTop" scroll-y scroll-with-animation
						:style="{height: scrollViewHeight + 'px'}">
						<view v-for="(item, index) in list.class" :key="index"
							class="tn-classify__tabbar__item tn-flex tn-flex-col-center tn-flex-row-center"
							:class="classid==item.id?'tn-classify__tabbar__item--active tn-bg-white':'tn-bg-gray--light tn-classify__tabbar__item--active--next'"
							@tap.stop="clickClassifyNav(item.id)">
							<view class="tn-classify__tabbar__item__title">{{ item.title }}</view>
						</view>
					</scroll-view>

					<!-- 右边容器 -->
					<scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop"
						:style="{height: scrollViewHeight + 'px'}">
						<block>
							<view class="tn-classify__content">
								<!-- 分类内容子栏目 -->
								<view class="tn-classify__content__sub-classify">
									<view
										class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left dibu">

										<block v-for="(otime, ind) in list.list" :key="ind"
											v-if="classid==otime.shopCategoryId">
											<view class="tn-flex tn-flex-col-top  tn-padding-xs">

												<view class="tn-flex tn-flex-col-top  tn-padding-xs">
													<view class="tn-flex tn-flex-col-center">
														<view class="image-pic"
															:style="'background-image:url(' + otime.mainimage + ')'">
															<view class="image-cart">
															</view>
														</view>
													</view>
												</view>
												<view class="tn-padding-left-sm" style="width: 90%;">
													<view
														class="tn-flex tn-flex-row-between tn-flex-col-between tn-padding-top-lg">
														<view class="justify-content-item">
															<text
																class="tn-color-black clamp-text-1">{{ otime.title }}</text>
														</view>
													</view>
													<view class="tn-flex tn-flex-row-between tn-flex-col-between">
														<view class="justify-content-item tn-padding-top-xs">
															<text
																class="tn-color-gray clamp-text-1">{{ otime.specifications }}</text>
														</view>
													</view>

													<view
														class="tn-flex tn-flex-row-between tn-flex-col-between tn-padding-top-lg">
														<view class="justify-content-item" style="opacity: 0.6;">
															<tn-number-box v-model="otime.aid" :min="0" 
																:disabledInput="true" @change="change"></tn-number-box>
														</view>
														<view
															class="justify-content-item tn-padding-top-xs tn-color-black">
															<text class="clamp-text-1">￥</text>
															<text class="clamp-text-1 tn-text-lg">{{ otime.pay }}</text>
														</view>
													</view>

												</view>
											</view>

										</block>

									</view>
								</view>
							</view>

						</block>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="tabbar footerfixed tn-bg-gray--light">
			<view class="tn-flex tn-flex-row-between tn-flex-col-center">
				<view class="justify-content-item tn-margin-top">
					<view class="tn-flex tn-flex-row-center tn-flex-col-center">

						<view class="tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-padding-right tn-text-ellipsis">
								<view class="tn-padding-right tn-padding-left-sm">
									<text>总价：￥</text>
									<text class="tn-text-lg">{{pay}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="justify-content-item tn-flex-row-center tn-margin-top tn-padding-right">
					<tn-button shape="round" backgroundColor="tn-bg-blue" width="100%"
						@click="xiadan">
						<text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
							在线下单
						</text>
					</tn-button>
				</view>
			</view>
		</view>
		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	export default {
		name: 'PagesB',
		data() {
			return {
				list: null,
				classid: 0,
				pay:0,
				xuanlist:[],
				// 子栏目
				subClassifyTabbar: [],
				// 显示子栏目分类选项
				showSubClassifyTabbar: false,
				// 每个子栏目下的内容
				// 分类菜单item的信息
				tabbarItemInfo: [],
				// scrollView的top值
				scrollViewBasicTop: 0,
				// scrollView的高度
				scrollViewHeight: 0,
				// 左边scrollView的滚动高度
				leftScrollViewTop: 0,
				// 右边scrollView的滚动高度
				rightScrollViewTop: 0,
				// 当前选中的tabbar序号
				currentTabbarIndex: 0
			}
		},
		
		onLoad(e) {
			this.getlist(e.id);
			this.$nextTick(() => {
				this.getScrollViewInfo()
			})
		},
		methods: {
			getlist(id) {
				let data = {
					shopid: id
				}
				let than = this;
				this.$http.postRequest('ShopCategoryGoods/xcxlist', data)
					.then(res => {
						this.list = res.data;
						this.classid = res.data.class[0].id
					})
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			// 获取scrollView的高度信息
			getScrollViewInfo() {
				// 获取搜索栏的bottom信息，然后用整个屏幕的可用高度减去bottom的值即可获取scrollView的高度(防止双重滚动)
				this._tGetRect('.tn-classify__search--wrap').then((rect) => {
					// 如果获取失败重新获取
					if (!rect) {
						setTimeout(() => {
							this.getScrollViewInfo()
						}, 10)
						return
					}
					// 获取当前屏幕的可用高度
					const systemInfo = uni.getSystemInfoSync()
					this.scrollViewBasicTop = systemInfo.statusBarHeight + rect.bottom + uni.upx2px(10)
					this.scrollViewHeight = systemInfo.safeArea.height + systemInfo.statusBarHeight - rect.bottom -
						uni
						.upx2px(10) - 49
				})
			},

			// 点击了分类导航
			clickClassifyNav(index) {
				this.classid = index
			},
			change(){
				let list=this.list.list
				let qian=0;
				let xuan=[];
				// for()
				list.forEach(function(item,index,arr){
					
					if(item.aid>0){
						qian=qian+item.aid*item.pay;
						xuan.push(item)
					}
				})
				this.pay=qian;
				this.xuanlist=xuan;
			},
			xiadan(){
				if(this.pay>0){
					uni.setStorageSync("goodslist", this.xuanlist);
					uni.redirectTo({
						url:'/pages/shop/payment'
					})
				}else{
					this.$refs.tips.show({
					  msg:"未选择商品不可下单" ,
					  backgroundColor: '#FB6A67',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.pages-b {
		max-height: 100vh;
	}




	.left-width {
		flex-basis: 28%;
	}

	/* 自定义导航栏内容 end */
	.tn-classify {

		/* 搜索栏 start */
		&__search {
			&--wrap {}

			&__box {
				flex: 1;
				text-align: center;
				padding: 20rpx 30rpx;
				margin: 0 30rpx;
				border-radius: 60rpx;
				font-size: 30rpx;
			}

			&__icon {
				padding-right: 10rpx;
			}

			&__text {
				padding-right: 10rpx;
			}
		}

		/* 搜索栏 end */

		/* 分类列表和内容 strat */
		&__container {}

		&__left-box {}

		&__right-box {
			background-color: #FFFFFF;
		}

		/* 分类列表和内容 end */

		/* 侧边导航 start */
		&__tabbar {
			&__item {
				height: 110rpx;

				&:first-child {
					border-top-right-radius: 0rpx;
				}

				&:last-child {
					border-bottom-right-radius: 0rpx;
				}

				&--active {
					background-color: #FFFFFF;
					position: relative;
					// font-weight: bold;
					color: #3668FC;

					&::before {
						content: '';
						position: absolute;
						width: 12rpx;
						height: 40rpx;
						top: 50%;
						left: 0;
						background-color: #3668FC;
						border-radius: 12rpx;
						transform: translateY(-50%) translateX(-50%);
					}

					&--prev {
						border-bottom-right-radius: 26rpx;
					}

					&--next {
						border-top-right-radius: 26rpx;
					}
				}
			}
		}

		/* 侧边导航 end */

		/* 分类内容 start */
		&__content {
			margin: 18rpx;

			/* 子栏目 end */
		}

		/* 分类内容 end */
	}



	.tabbar {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		align-items: center;
		min-height: 130rpx;
		padding: 0;
		height: calc(130rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.image-cart {
		width: 190rpx;
		height: 190rpx;
		font-size: 16rpx;
		font-weight: 300;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		// border-radius: 15rpx 15rpx 0 0;
	}

	.dibu {
		padding-bottom: 15vh;
	}
</style>