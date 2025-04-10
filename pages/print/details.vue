<template>
	<view class="oa-content">

		<view class="">
			<view class="tn-flex tn-flex-wrap tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				<view class="tn-flex-basic-xl">
					<view v-if="bydata.status==1">已下单</view>
					<view v-if="bydata.status==2">已发货</view>
					<view v-if="bydata.status==3">已送达</view>
					<view v-if="bydata.status==4">已驳回</view>
					<view class="yanshi" v-if="bydata.status==1">{{bydata.ctime}}</view>
					<view class="yanshi" v-if="bydata.status==2">{{bydata.ftime}}</view>
					<view class="yanshi" v-if="bydata.status==3">{{bydata.stime}}</view>
					<view class="yanshi" v-if="bydata.status==4">{{bydata.jtime}}</view>
				</view>
				<view class="tn-flex-basic-xs " @click="xiangq" v-if="bydata.status<4 && bydata.status>1">
					<text class="tn-color-blue"> 详情信息></text>
				</view>
			</view>
			<view class="zhushi tn-float-right tn-color-blue">
				<text class="tn-icon-tip-fill"></text>
				快递送到学校之后，将由平台跑腿人员免费送到您手上
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						待打印文件
					</view>
				</view>
			</view>

			<view class="tn-margin-left tn-margin-right tn-margin-bottom"
				style="background-color: #00C8B008;color: #00C8B0;border-radius: 10rpx;"
				v-for="(item, index) in filelist" :key="index">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
					<view class="justify-content-item tn-text-bold tn-text-left" style="width: 100%;">
						<view class="">
							<text class="">{{item.filename}} </text>
						</view>
						<view class="tn-padding-top-xs tn-text-sm">
							<text class="tn-icon-folder-fill "></text>
							<text class="tn-padding-left-xs">
								{{item.page}}页、{{item.paper==1?"A3":"A4"}}、{{item.weight==1?"80g":"70g"}}、{{item.mian==1?"双面":"单面"}}、{{item.zhuang==1?"订书针装订":"不需装订"}}

							</text>

						</view>
						<view class="tn-padding-top-xs tn-text-sm">
							<text class="tn-padding-left-xs tn-color-orange">共：{{item.yemun}}份 ¥ {{item.pay}}</text>

						</view>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				总价
				<text class="tn-float-right tn-color-orange ">¥ {{bydata.amount}}</text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding daxia">
				实付
				<text class="tn-float-right tn-color-orange tn-text-bold">¥ {{bydata.amount}}</text>
			</view>

			<view class="zhushi tn-float-right">
				<text class="tn-icon-tip-fill"></text>
				订单不足12元按12元收取
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding  tn-strip-top xiantia">
				订单编号
				<text class="tn-float-right ">{{bydata.number}}</text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding  xiantia">
				创建时间
				<text class="tn-float-right ">{{bydata.ctime}}</text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding  xiantia">
				付款时间
				<text class="tn-float-right ">{{bydata.ytime}}</text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding  xiantia" v-if="bydata.status>2">
				快递公司
				<text class="tn-float-right ">{{bydata.delivery}}</text>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding  xiantia" v-if="bydata.status>2">
				物流单号
				<text class="tn-float-right ">{{bydata.deliveryNumber}}</text>
			</view>

		</view>

		<tn-popup v-model="show" mode="bottom" borderRadius="20" :closeBtn="true">
			<view class="tn-padding">
				<view class="content">
					<scroll-view scroll-y="true" style="height: 65vh;">
						<view class="time-line__wrap">
							<tn-time-line>
								<block v-for="(item, index) in expressData" :key="index">
									<tn-time-line-item >
										
										<template slot="content">
											<view>
												<view class="time-line-item__content__desc">{{ item.status }}</view>
												<view class="time-line-item__content__time">{{ item.time }}</view>
											</view>
										</template>
									</tn-time-line-item>
								</block>
							</tn-time-line>
						</view>
					</scroll-view>
				</view>
			</view>
		</tn-popup>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateCost',
		mixins: [template_page_mixin],
		data() {
			return {
				value: 0,
				guizelist: null,
				filelist: null,
				pay: 0,
				address: null,
				show: false,
				id: 0,
				bydata: null,
				expressData: []
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getdetails();
		},
		onShow() {

		},
		methods: {
			getdetails() {
				this.$http.postRequest('PrintingOrder/details', {
						id: this.id
					})
					.then(res => {
						this.bydata = res.data
						let realArray = JSON.parse(res.data.filelist);
						this.filelist = realArray
						console.log(res)
						this.getwuliu();

					})
			},
			xiangq(){
				this.show=true;
			},
			getwuliu(){
				if(this.bydata.status<4 && this.bydata.status>1){
					this.$http.postRequest('PrintingOrder/getwuliu', {
							id: this.id
						})
						.then(res => {
							this.expressData=res.data.result.list
							console.log(res.data.result.list)
							
					
						})
				}
			}


		}
	}
</script>

<style lang="scss" scoped>
	.tn-strip-top {
		width: 100%;
		border-top: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	.xuan {
		background-color: #ffaa7f;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}

	.wei {
		background-color: #949494;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}

	.zhushi {
		padding: 0 30rpx;
		color: #ffaa7f;
		padding-bottom: 10rpx;
		// height: 100rpx;
	}

	.daxia {
		font-size: 35rpx;
	}

	.xiantia {
		border-bottom: 1rpx solid #949494;
	}



	.tn-time-line-class {
		.tn-time-line-item-class {
			&:first-child {
				.tn-time-line-item__node {
					.time-line-item__node {
						background-color: $tn-main-color !important;
					}
				}
			}
		}
	}

	.time-line {

		&__wrap {
			padding: 30rpx;
		}

		&-item {
			&__node {
				width: 44rpx;
				height: 44rpx;
				border-radius: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #AAAAAA;

				&--active {
					background-color: $tn-main-color;
				}

				&--icon {
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}

			&__content {
				&__title {
					font-weight: bold;
					font-size: 32rpx;
				}

				&__desc {
					color: $tn-font-sub-color;
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}

				&__time {
					color: $tn-font-holder-color;
					font-size: 26rpx;
				}
			}
		}
	}
	.yanshi{
		color: #AAAAAA;
		margin-top: 5rpx;
		font-size: 26rpx;
	}
</style>
