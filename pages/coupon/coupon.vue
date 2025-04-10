<template>
	<view>
		<view v-for="(item, index) in couponList" :key="index" class="coupon_box">
			<view class="left">
				<view class="left_top">
					<text class="hui" :style="'background:' + colors">{{item.lxid==1?"团":"跑"}}</text>
					<text class="hui_name">{{item.title}}</text>
				</view>
				<view class="left_bottom">
					<text>
						<slot>有效期：</slot>{{item.dates}}
					</text>
				</view>
			</view>
			<image src="../../static/img/ysy.png" class="ysy" v-if="item.status == 1"></image>
			<view class="right" :style="'background:' + (item.status == 0 ? colors:'')">
				<view class="money">￥{{item.sub}}.00</view>
				<text>满{{item.money}}可用</text>
				<text class="shiyong" :style="{'color': colors}" v-if="item.status == 0"
					@click="jumpNext(item)">去使用</text>
			</view>
		</view>
		<view   class="wu" v-if="couponList.length==0">
			 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无通知"></tn-empty>
		</view>
		<tn-tips ref="tips" position="center" ></tn-tips>
	</view>
	
</template>


<script>
	export default {
		data() {
			return {
				colors: '#55aaff',
				couponList: [],
				lxid:0,
				money:0
			};
		},
		onLoad(e) {
			if(e.lxid){
				this.lxid=e.lxid;
				this.money=e.money;
			}
			this.getlist();
			uni.removeStorageSync('coupon');
		},
		methods: {
			getlist(){
				this.$http.postRequest('CouponUser/List', {
					"uid": uni.getStorageSync('uid'),
					"lxid":this.lxid,
					"money":this.money,
				})
				.then(res => {
					// console.log(res) 
					this.couponList=res.data
				})
			},
			jumpNext(item) {
				if(this.lxid==0){
					uni.switchTab({
						url: "/pages/index/index"
					})
				}else{
					if(this.money>=item.money){
						uni.setStorageSync("coupon", item)
						uni.navigateBack({
							delta: 1, //返回层数，2则上上页
						})
					}else{
						this.$refs.tips.show({
						   msg: "未满足要求，不可使用",
						   backgroundColor: '#E83A30',
						   fontColor: '#FFFFFF',
						   duration: 1500
						 })
					}
				}
				
			}

		}
	};
</script>

<style scoped lang="scss">
	.wu{
		margin-top: 25vh;
	}
	.coupon_box {

		margin: 28upx 28upx;
		box-shadow: 0upx 0upx 10upx #ddd;
		position: relative;
		border-radius: 10upx;
		overflow: hidden;

	}

	.coupon_box .left {
		width: 70%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20upx;
		float: left;
	}

	.coupon_box .left .hui {
		width: 40upx;
		height: 40upx;
		font-size: 20upx;
		color: #fff;
		background-color: #EC1818;
		border-radius: 8upx;
		line-height: 40upx;
		text-align: center;
		display: inline-block;
		transform: translateY(-5upx);
	}

	.coupon_box .left .left_top {
		width: 60vw;
		display: block;
		font-size: 26upx;
		font-weight: bold;

	}

	.left_top .hui_name {
		line-height: 60upx;
		height: 60upx;
		margin-left: 20upx;
		display: inline-block;
	}

	.left_bottom {
		font-size: 24upx;
		font-weight: bold;
		color: #333;
		height: 60upx;
		line-height: 60upx;
	}

	.coupon_box .right {
		text-align: center;
		height: 160upx;
		width: 180upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		background-color: #A8A8A8;
		float: right;
	}

	.coupon_box .right .shiyong {
		height: 40upx;
		line-height: 40upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 0 20upx;
		color: #A8A8A8;

	}

	.coupon_box .right .money {
		font-size: 45upx;
		color: #fff;
	}

	.coupon_box .right text {
		font-size: 24upx;
		color: #fff;
		height: 40upx;
		line-height: 34upx;
	}

	.coupon_box .bottom {
		height: 60upx;
		line-height: 60upx;
		display: flex;
		align-content: flex-start;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.coupon_box .bottom view {
		margin-right: 20upx;
		color: #888;
		font-weight: bold;
	}

	.ysy {
		width: 80upx;
		height: 80upx;
		position: absolute;
		top: 20upx;
		right: 200upx;
	}
</style>