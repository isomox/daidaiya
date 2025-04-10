<template>
	<view class="template-king tn-safe-area-inset-bottom">

		<view>
			<view class="king-list tn-margin-top-sm">

				<view class="king-icon">
					<text class='tn-icon-order tn-color-white tn-text-lg tn-bg-purple tn-round tn-padding-xs'></text>
					<text class='tn-text-xl tn-margin-left'>订单信息</text>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill'>
					<view class="resume2">
						<text class="">
							订单编号：{{Order.number}}
						</text>
					</view>
					<view class="resume2" >
						<text class="">
							下单时间：{{ Order.ctime }}
						</text>
					</view>
					<view class="resume2">
						<text class="">
							订单类型：{{ Order.lxid==1?"快递代取":Order.lxid==2?"陪替服务":Order.lxid==3?"急事代办":Order.lxid==4?"毕业设计":Order.lxid==5?"论文答辩":"代买服务" }}
						</text>
					</view>
					<view class="resume2" v-if="Order.lxid==2">
						<text class="">
							陪替类型：{{ Order.title }}
						</text>
					</view>
					<view class="resume2" v-if="Order.lxid!=1">
						<text class="">
							订单信息：{{ Order.illustrate }}
						</text>
					</view>
					<view class="resume2" v-if="Order.lxid==1 && Order.status>1">
						<text class="">
							订单信息：{{ Order.illustrate }}
						</text>
					</view>
					
					<view class="resume2" v-if="Order.lxid==1">
						<text class="">
							预计送达时间：{{ Order.yjtime }}
						</text>
					</view>
					<view class="resume2" v-if="Order.fileurl" >
						<text class="">
							附件文件：
						</text>
						<text class="boda" @click="xaza">
							立即下载
						</text>
					</view>
					<view class="resume2" >
						<text class="">
							订单金额：¥ {{ Order.amount }}
						</text>
					</view>
					<view class="resume2" >
						<text class="">
							优惠金额：¥ {{ Order.amount-Order.payAmount }}
						</text>
					</view>
					<view class="resume2" >
						<text class="">
							实付金额：¥ {{ Order.payAmount }}
						</text>
					</view>
					<view class="resume2" v-if="Order.connectAmount>0 && ulx==0">
						<text class="" >
							跑男佣金：¥ {{ Order.connectAmount}}
						</text>
						
					</view>
				</view>
				

				<view class="king-icon">
					<text class='tn-icon-my tn-color-white tn-text-lg tn-bg-purple tn-round tn-padding-xs'></text>
					<text class='tn-text-xl tn-margin-left'>用户信息</text>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill'>
					<view>
						<view class="resume tn-text-lg">
							<view class="">{{ Order.name }}</view>
							<view class='boda' @click="boda(Order.phone)">拨打电话</view>
						</view>
					</view>
				</view>

				<view class="king-icon" v-if="Order.status>1 && Order.connectName">
					<text class='tn-icon-delivery tn-color-white tn-text-lg tn-bg-purple tn-round tn-padding-xs'></text>
					<text class='tn-text-xl tn-margin-left'>跑男信息</text>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill' v-if="Order.status>1  && Order.connectName">
					<view>
						<view class="resume tn-text-lg">
							<view class="">{{ Order.connectName }}</view>
							<view class='boda' @click="boda(Order.connectPhone)">拨打电话</view>
						</view>
					</view>
				</view>


				<view class="king-icon">
					<text
						class='tn-icon-footprint tn-color-white tn-text-lg tn-bg-purple tn-round tn-padding-xs'></text>
					<text class='tn-text-xl tn-margin-left'>订单流程</text>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill'>
					<view class="resume text-lg">
						<text>付款时间 </text>
						<text class='fr'>{{ Order.ytime }}</text>
					</view>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill' v-if="Order.jtime">
					<view class="resume text-lg">
						<text>接单时间</text>
						<text class='fr'>{{ Order.jtime }}</text>
					</view>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill' v-if="Order.stime">
					<view class="resume text-lg">
						<text>送达时间</text>
						<text class='fr'>{{ Order.stime }}</text>
					</view>
				</view>
				<view class='king-item tn-color-light tn-icon-circle-fill' v-if="Order.qtime">
					<view class="resume text-lg">
						<text>签收时间</text>
						<text class='fr'>{{ Order.qtime }}</text>
					</view>
				</view>
				
			</view>

			<view class="tn-tabbar-height"></view>

			<!-- 悬浮按钮-->
			<view class="tn-flex tn-footerfixed">

				<view class="tn-flex-1 justify-content-item tn-margin-right tn-margin-left tn-text-center">
					<tn-button backgroundColor="#8A5BF1 " padding="40rpx 0" width="100%" :fontSize="28" v-if="ulx==0&&Order.status==1"
						fontColor="#FFFFFF" shape="round" @click="zhuangt(2)">
						<text class="">立即抢单</text>
					</tn-button>
					<tn-button backgroundColor="#8A5BF1 " padding="40rpx 0" width="100%" :fontSize="28" v-if="ulx==0&&Order.status==2"
						fontColor="#FFFFFF" shape="round" @click="zhuangt(3)">
						<text class="">立即取货</text>
					</tn-button>
					<tn-button backgroundColor="#8A5BF1 " padding="40rpx 0" width="100%" :fontSize="28" v-if="ulx==0&&Order.status==3"
						fontColor="#FFFFFF" shape="round" @click="zhuangt(4)">
						<text class="">订单送达</text>
					</tn-button>
					<tn-button backgroundColor="#8A5BF1 " padding="40rpx 0" width="100%" :fontSize="28" v-if="ulx==1&&Order.status==1"
						fontColor="#FFFFFF" shape="round"  @click="quxiao()">
						<text class="">取消订单</text>
					</tn-button>
					<tn-button backgroundColor="#8A5BF1 " padding="40rpx 0" width="100%" :fontSize="28" v-if="ulx==1 && Order.status==4"
						fontColor="#FFFFFF" shape="round" @click="zhuangt(5)">
						<text class="">订单签收</text>
					</tn-button>
				</view>
			</view>





		</view>

		<tn-tips ref="tips" position="center"></tn-tips>

	</view>

</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateKing',
		mixins: [template_page_mixin],
		data() {
			return {
				id:0,
				Order:{},
				userData:{},
				ulx:0,
			}
		},

		onLoad(e) {
			this.id=e.id;
			this.ulx=e.lx;
			this.getbydata();
		},
		methods: {
			
			getbydata(){
				
				this.$http.postRequest('OrderList/ByData', {id:this.id})
					.then(res => {
						this.Order=res.data
						// console.log(res)
					})
			},
			boda(e){
				if(this.Order.status==1){
					this.$refs.tips.show({
					  msg:"未接单，不可拨打电话！" ,
					  backgroundColor: '#FB6A67',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}else{
					uni.makePhoneCall({
						phoneNumber: e,
						success: () => {
						  console.log('拨打电话成功！');
						},
						fail: () => {
						  console.error('拨打电话失败！');
						}
					});
				}
			},
			zhuangt(e){
				this.$http.postRequest('OrderList/rob', {
					id:this.id,
					uid:uni.getStorageSync('uid'),
					status:e
					}).then(res => {
						// this.Order=res.data
						// console.log(res)
						if(res.code==200){
							this.getbydata()
						}else{
							this.$refs.tips.show({
							  msg:"抢单失败！" ,
							  backgroundColor: '#FB6A67',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
							uni.navigateBack({
								delta: 1, //返回层数，2则上上页
							})
						}
					})
			},
			quxiao(){
				this.$http.postRequest('OrderList/applyBack', {
					id:this.id,
					uid:uni.getStorageSync('uid')
					}).then(res => {
						// this.Order=res.data
						// console.log(res)
						if(res.code==200){
							this.getbydata()
						}else{
							this.$refs.tips.show({
							  msg:"取消失败！" ,
							  backgroundColor: '#FB6A67',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
							// uni.navigateBack({
							// 	delta: 1, //返回层数，2则上上页
							// })
						}
					})
			},
			xaza(){
				uni.downloadFile({
					url:this.Order.fileurl,
					success(res) {
						uni.saveFile({
						    tempFilePath: res.tempFilePath,
						    success: (list) => {
						      var saveFilePath = list.savedFilePath;
								  uni.showModal({
									title: "提示",
									content: "文件已保存：" + saveFilePath,
									cancelText: "我知道了",
									confirmText: "打开文件",
									success: (res2) => {
									  if (res2.confirm) {
										uni.openDocument({
										  filePath: saveFilePath,
										  success: (res) => {
											console.log("打开文档成功", JSON.stringify(res))
										  }
										})
									  } 
									}
								  })
						    },
						    fail: (err) => {
						      console.log('文件下载失败', err);
						    },
						})
					}
				})
				
			}
			

		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 100%;
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

		&:before {
			content: " ";
			width: 1rpx;
			height: 110%;
			position: absolute;
			top: 22.5%;
			left: 0;
			right: 0;
			margin: auto;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			opacity: 0.7;
			background-color: #FFFFFF;
		}
	}

	/* 自定义颜色 */
	.tn-color-friend {
		color: #100B59;
	}

	.tn-color-light--dark {
		color: #57548A;
	}

	.tn-color-light {
		color: #A6A9CB;
	}

	/* 主图固定 */
	.beibei {
		width: 100%;
		height: 1000upx;
	}

	.beibei2 {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		position: relative;
		background-position: center center;
		background-size: cover;
	}

	/* 相册 */
	.slideshow {
		top: 0;
		position: absolute;
		width: 100vw;
		height: 1000upx;
		overflow: hidden;
	}

	.slideshow-image {
		position: absolute;
		width: 100%;
		height: 100%;
		background: no-repeat 50% 50%;
		background-size: cover;
		-webkit-animation-name: kenburns;
		animation-name: kenburns;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-duration: 16s;
		animation-duration: 16s;
		opacity: 1;
		transform: scale(1.2);
	}

	.slideshow-image:nth-child(1) {
		-webkit-animation-name: kenburns-1;
		animation-name: kenburns-1;
		z-index: 3;
	}

	.slideshow-image:nth-child(2) {
		-webkit-animation-name: kenburns-2;
		animation-name: kenburns-2;
		z-index: 2;
	}

	.slideshow-image:nth-child(3) {
		-webkit-animation-name: kenburns-3;
		animation-name: kenburns-3;
		z-index: 1;
	}

	.slideshow-image:nth-child(4) {
		-webkit-animation-name: kenburns-4;
		animation-name: kenburns-4;
		z-index: 0;
	}

	@-webkit-keyframes kenburns-1 {
		0% {
			opacity: 1;
			transform: scale(1.2);
		}

		1.5625% {
			opacity: 1;
		}

		23.4375% {
			opacity: 1;
		}

		26.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}

		98.4375% {
			opacity: 0;
			transform: scale(1.2117647059);
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes kenburns-1 {
		0% {
			opacity: 1;
			transform: scale(1.2);
		}

		1.5625% {
			opacity: 1;
		}

		23.4375% {
			opacity: 1;
		}

		26.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}

		98.4375% {
			opacity: 0;
			transform: scale(1.2117647059);
		}

		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes kenburns-2 {
		23.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		26.5625% {
			opacity: 1;
		}

		48.4375% {
			opacity: 1;
		}

		51.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}
	}

	@keyframes kenburns-2 {
		23.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		26.5625% {
			opacity: 1;
		}

		48.4375% {
			opacity: 1;
		}

		51.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}
	}

	@-webkit-keyframes kenburns-3 {
		48.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		51.5625% {
			opacity: 1;
		}

		73.4375% {
			opacity: 1;
		}

		76.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}
	}

	@keyframes kenburns-3 {
		48.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		51.5625% {
			opacity: 1;
		}

		73.4375% {
			opacity: 1;
		}

		76.5625% {
			opacity: 0;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1.2);
		}
	}

	@-webkit-keyframes kenburns-4 {
		73.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		76.5625% {
			opacity: 1;
		}

		98.4375% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: scale(1);
		}
	}

	@keyframes kenburns-4 {
		73.4375% {
			opacity: 1;
			transform: scale(1.2);
		}

		76.5625% {
			opacity: 1;
		}

		98.4375% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: scale(1);
		}
	}


	/* 简历内容 */
	.king-list {
		display: block;
		background-color: #ffffff;
	}

	.king-list .king-icon {
		width: 100%;
		text-align: left;
		padding: 20rpx 0 20rpx 37rpx;
		font-size: 26rpx;
		color: #A19FBE;

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
		background-color: #A6A9CB80;
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
		border: 2rpx solid #eee;
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
		color: #100B5980;
		line-height: 1.6;
	}

	.resume+.resume {
		margin-top: 20rpx;
	}

	.resume2 {
		padding-top: 10rpx;
		border-radius: 6rpx;
		display: block;
		color: #100B59;
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
			line-height: 42rpx;
			padding: 8rpx 22rpx;
			margin: 0rpx 20rpx 25rpx 0rpx;

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

	/* 标签 start*/
	.tag-user {
		display: inline-block;
		padding: 8rpx 12rpx 6rpx;
		margin: 0 15rpx 10rpx 0;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 0.15);
	}

	/* 标签 end*/

	/* 按钮 */
	.button-dd {
		background-color: #7948EA00;
		position: fixed;
		/* bottom:200rpx;
      right: 20rpx; */
		bottom: 20%;
		right: 30rpx;
		z-index: 1001;
		border-radius: 100px;
	}

	/* 图标容器15 start */
	.icon15 {
		&__item {
			width: 30%;

			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 50rpx;
				opacity: 0.8;
				border: 1px solid #7948EA;
				color: #7948EA;
				box-shadow: 0rpx 0rpx 6rpx #7948EA;
				border-radius: 100rpx;
				margin-bottom: 18rpx;
				z-index: 999;

				&::after {
					content: " ";
					position: absolute;
					z-index: 995;
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

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom));
		height: calc(120rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(60rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		transition: all 0.45s ease-out;
		will-change: transform;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/


	// 点赞
	.template-bubble {

		// position: relative;

		.bubble {
			position: fixed;
			bottom: 24vh;
			right: -25vw;
			z-index: 1024;
			pointer-events: none;
			background-color: #7948EA00;
		}
	}
	.boda{
		color: #4B98FE;
	}
</style>