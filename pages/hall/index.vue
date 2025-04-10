<template>
	<view class="oa-content">

		<view class="tn-bg-white top-fixed">
			<tn-tabs :list="fixedList" :current="current" :isScroll="false" activeColor="#3D7EFF"
				inactiveColor="#C5CAD5" :bold="true" backgroundColor="#FFFFFF" :fontSize="32" :badgeOffset="[20, 50]"
				@change="tabChange"></tn-tabs>
		</view>

		<view class="tn-padding-bottom-xl" :style="{paddingTop: vuex_custom_bar_height  -25 +'px'}">
			<view class="">
				<view class="content-bg tn-margin tn-padding" style="position: relative;"
					v-for="(item, index) in noticeList" :key="index" @click="jsm(item)">
					<view :class="['oa-' + getcolor(item.status) ]"
						style="width: 15rpx;height: 100%;position: absolute;top: 0;left:0;border-radius: 15rpx 0 0 15rpx;font-size: 32rpx;">
					</view>
					<view class="tn-margin-left-xs">
						<view class="tn-flex tn-flex-col-center tn-flex-row-between" style="margin-top: -6rpx;">
							<view
								class="justify-content-item tn-flex tn-flex tn-flex-col-center tn-text-lg tn-text-bold">
								<view class="justify-content-item">
									{{ item.lxid==1?"快递代取":item.lxid==2?"陪替服务":item.lxid==3?"急事代办":item.lxid==4?"毕业设计":item.lxid==5?"论文答辩":"代买服务" }}
								</view>
								<view class="justify-content-item" >
									<view class="tag-state"
										:class="['tn-bg-' + getcolor(item.status) + '--light oa-' + getcolor(item.status)]"
										style="font-size: 16rpx;">
										
										<text class="" v-if="current==0 && item.status>1">已帮助</text>
										<text class="" v-if="current==0 && item.status==1">{{ item.status | getstatus }}</text>
										<text class="" v-if="current>0">{{ item.status | getstatus }}</text>
									</view>
								</view>
							</view>
							<view class="justify-content-item tn-color-gray">
								{{ item.ytime }}
							</view>
						</view>
						<view class="tn-text-justify clamp-text-1 tn-padding-top-xs tn-color-gray--dark">
							{{ item.title }}
						</view>

					</view>

				</view>
			</view>
			<view v-if="noticeList.length==0" class="wu">
				 <tn-empty icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/paotui/ioc/2.png" text="暂无数据"></tn-empty>
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
				current: 0,
				page: 1,
				fixedList: [{
						name: '全部'
					},{
						name: '待接单'
					},
					{
						name: '已接单'
					},
					{
						name: '我发布'
					}
				],
				noticeList: [],
				uid:0,
			}
		},
		
		onShow() {
			this.uid=uni.getStorageSync('uid');
			this.page=1;
			this.noticeList=[];
			this.getlist();
			
		},
		methods: {
			// tab选项卡切换
			tabChange(index) {
				this.current = index;
				this.page=1;
				this.noticeList=[];
				this.getlist();
			},
			// 跳转
			tn(e,b) {
				uni.navigateTo({
					url: '/pages/order/details?id='+e+'&lx='+b,
				});
			},
			getcolor(lx){
				if(lx==1){return 'orangered'; }
				else if(lx==2){return "indigo"; }
				else if(lx==3){return "blue"; }
				else if(lx==4){return "cyan"; }
				else if(lx==5){return "green"; }
				else if(lx==6){return "yellow"; }
				else if(lx==9){return "dark"; }
			},
			getlist() {
				let data = {
					page: this.page,
					limit: 20,
					schoolid: uni.getStorageSync('school').id,
					uid: uni.getStorageSync('uid'),
					lx: this.current
				}
				let than = this;
				this.$http.postRequest('OrderList/xcxlist', data)
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
			jsm(item){
				let uid=uni.getStorageSync('uid');
				if(this.current==1){
					console.log(1212)
					this.$http.postRequest('OrderList/Receiving', {
						id:item.id,
						uid:uni.getStorageSync('uid')
					}).then(res => {
						console.log(res)
						if(res.code!=200){
							this.$refs.tips.show({
							  msg:res.msg ,
							  backgroundColor: '#FB6A67',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
						}else{
							this.tn(item.id,0)
						}
					})
				}else if(this.current==2){
					this.tn(item.id,0)
				}else if(this.current==3){
					this.tn(item.id,1)
				}else if(this.current==0){
					console.log(item)
					
					if(item.status==0){
						this.$http.postRequest('OrderList/Receiving', {
							id:item.id,
							uid:uid
						}).then(res => {
							console.log(res)
							if(res.code!=200){
								this.$refs.tips.show({
								  msg:res.msg ,
								  backgroundColor: '#FB6A67',
								  fontColor: '#FFFFFF',
								  duration: 1500
								})
							}else{
								this.tn(item.id,0)
							}
						})
					}else{
						if(uid==item.connect_uid){
							this.tn(item.id,0)
						}else{
							this.$refs.tips.show({
							  msg:"已有跑男进行了帮助，不可查看！",
							  backgroundColor: '#55aaff',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
						}
						
					}
				}
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
</style>