<template>
	<view class="template-tuniao tn-safe-area-inset-bottom">

		<view class="tn-margin-top-sm">
			<view class="tn-margin-left tn-margin-right tn-margin-top-sm">
				<tn-swiper :list="banner" :height="320" :effect3d="false" mode="round"></tn-swiper>
			</view>
			<view class='nav-list tn-margin-top'>

				<view class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-cool-bg-color-6 tn-wihu" @click="shangchuan">
					<view class="nav-link">
						<view class='title'>从微信获取待打印文件</view>
					</view>
					<view class="icon tn-pianyi">
						<view class="tn-icon-upload"></view>
					</view>
				</view>

			</view>
			<view class='nav-list  '>
				<block v-for="(item, index) in navList" :key="index">
					<view class="nav-list-item tn-shadow-blur tn-cool-bg-image"
						:class="['tn-cool-bg-color-' + item.color]" @click="tn(item.url)">
						<view class="nav-link">
							<view class='title'>{{ item.title }}</view>
						</view>
						<view class="icon">
							<view :class="['tn-icon-' + item.icon]"></view>
						</view>
					</view>
				</block>
			</view>
			<view class="tn-flex tn-margin-left tn-margin-right tn-biangk ">
				<view class="tn-flex tn-flex-wrap tn-padding-bottom">
					<view class="king-list tn-margin-top-sm">
						<view class="king-icon">
							<text class='tn_hei'>操作流程</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>1</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>先用office软件将待打印文件转成PDF格式</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>2</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>再将PDF文件发送到微信文件传输助手</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>3</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>再点击上方【从微信获取待打印文件】</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>4</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>从微信传输助手聊天框选择你要打印的文件</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>5</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>进行文件打印设置并下单</text>
						</view>
						<view class="king-icon">
							<text class='tn-color-white tn-text-xd tn-bg-orange tn-round tn-padding-xs'>6</text>
							<text class='tn-text-xd tn-margin-left tn-color-gray'>坐等送货上门</text>
						</view>
					</view>
				</view>
			</view>

			<view class="tn-body">
				<tn-list-view unlined="bottom" :customTitle="true">
					<template slot="title">
						<view class="custom-title ">
							<text class="tn-icon-order-fill tn-padding-right-xs tn-color-orange"></text>
							价目表
				  </view>
					</template>

					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight" v-for="(itme,index) in noticeList" :key="index">
						<view>
							<view class="custom-title">[{{itme.paper==0?"A4":"A3"}}-70g纸，黑白打印]<text class="tn-color-orange">升级80g纸，每页加收{{itme.pay}}分钱
								</text></view>
							<view class="custom-title">单面打印</view>
							<view class="custom-title">1 ~ {{itme.pages}}页<text class="tn-float-right">{{itme.onePay/10}}毛/张</text></view>
							<view class="custom-title">{{itme.pages}}页以上<text class="tn-float-right">{{itme.onePayS/10}}毛/张</text></view>
							<view class="custom-title">双面打印</view>
							<view class="custom-title">1 ~ {{itme.pages}}页<text class="tn-float-right">{{itme.twoPay/10}}毛/张</text></view>
							<view class="custom-title">{{itme.pages}}页以上<text class="tn-float-right">{{itme.twoPayS/10}}毛/张</text></view>
						</view>
					</tn-list-cell>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						<view>
							<view class="custom-title">【订书针装订】</view>
							<view class="custom-title">单本大于30页<text class="tn-float-right">免费装订</text></view>
							<view class="custom-title">单本小于等于30页<text class="tn-float-right">2毛/本</text></view>
						</view>
					</tn-list-cell>
				</tn-list-view>
			</view>


		</view>



<tn-tips ref="tips" position="center"></tn-tips>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateCourse',
		mixins: [template_page_mixin],

		data() {
			return {
				banner: [{
					image: 'https://resource.tuniaokj.com/images/swiper/tnbanner1.jpg'
				}, {
					image: 'https://resource.tuniaokj.com/images/swiper/tnbanner2.jpg'
				}, {
					image: 'https://resource.tuniaokj.com/images/swiper/tnbanner3.jpg'
				}, {
					image: 'https://resource.tuniaokj.com/images/swiper/tnbanner4.jpg'
				}],
				navList: [{
						icon: 'folder',
						title: '我的文件',
						color: '1',
						url:'./file'
					},
					{
						icon: 'order',
						title: '我的订单',
						color: '5',
						url:"./order"
					}
				],
				tuniaoData: [{
						title: '我的文件',
						icon: 'folder-fill',
						color: 'indigo',
						value: '前往查看'
					},
					{
						title: '我的订单',
						icon: 'order-fill',
						color: 'blue',
						value: '前往查看'
					}
				],
				action:"",
				noticeList:[],
				list:{
					 filename:"",
					 fileurl:"",
					 page:0,
					 paper:0,
					 weight:0,
					 mian:0,
					 zhuang:0,
					 yemun:1,
					 pay:0
				 }
			}
		},

		onShow() {
			this.action=this.$http.commoneUrl+'file/imges';
			this.getlist();
		},
		methods: {
			tn(e){
				uni.navigateTo({
					url:e
				})
			},
			getlist() {
				let data = {
					schoolid: uni.getStorageSync('school').id
				}
				let than = this;
				this.$http.postRequest('PrintingRules/List', data)
					.then(res => {
						than.noticeList = res.data
						uni.setStorageSync("guizelist", res.data)
					})
			},
			shangchuan(){
				let _that=this;
				uni.chooseMessageFile({
					count: 1, //最多可以选择的文件个数，可以 0～100
					type: 'file', //所选的文件的类型，具体看官方文档
					success (res) {
						const tempFilePaths = res.tempFiles[0].path
						let filename = res.tempFiles[0].name;
						
						// console.log(tempFilePaths,filename,filename.indexOf(".pdf"))
						var suffix =filename.substring(filename.lastIndexOf(".")+1);
						if(suffix=="pdf"){
							
							
							wx.uploadFile({
								url: _that.action,   //上传的路径
								filePath: tempFilePaths, //刚刚在data保存的文件路径
								name: 'file',   //后台获取的凭据
								formData:{ //如果是需要带参数，请在formData里面添加，不需要就去掉这个就可以的
									"userId": 1,
									"fileName": filename
								},
								success(res) { 
									let datalisy=JSON.parse(res.data);
									if(datalisy.code==200){
										 _that.list.filename=filename;
										_that.list.fileurl=datalisy.data;
										_that.getyeshu();
										 
									}else{
										_that.$refs.tips.show({
										  msg: '上传失败',
										  backgroundColor: '#E83A30',
										  fontColor: '#FFFFFF',
										  duration: 1500
										})
									}
									//
									
									
								}
							})
							
						} else {
							_that.$refs.tips.show({
							  msg: '暂时仅支持pdf格式的文件',
							  backgroundColor: '#E83A30',
							  fontColor: '#FFFFFF',
							  duration: 1500
							})
							return
						}
					}
				})
			},
			getyeshu(){
				let data = {
					file: this.list.fileurl
				}
				let than = this;
				this.$http.postRequest('file/pageCount', data)
					.then(res => {
						this.list.page=res.data
						this.shuju();
					})
			},
			shuju(){
				let arr=uni.getStorageSync('filelist');
				if(arr){
					arr.push(this.list)
					uni.setStorageSync("filelist", arr)
				}else{
					var jsonArray = [];
					jsonArray.push(this.list)
					uni.setStorageSync("filelist", jsonArray)
				}
				this.tn('./file')
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 组件导航列表 start*/
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0rpx 12rpx 0rpx;
		justify-content: space-between;

		/* 列表元素 start */
		.nav-list-item {
			padding: 95rpx 30rpx 5rpx 30rpx;
			border-radius: 12rpx;
			width: 45%;
			margin: 0 18rpx 40rpx;
			background-size: cover;
			background-position: center;
			position: relative;
			z-index: 99;

			/* 元素标题 start */
			.nav-link {
				font-size: 32rpx;
				text-transform: capitalize;
				padding: 0 0 10rpx 0;
				position: relative;

				.title {
					color: #FFFFFF;
					margin-top: 30rpx;
					text-align: center;
				}
			}

			/* 元素标题 end */

			/* 元素图标 start */
			.icon {
				font-variant: small-caps;
				position: absolute;
				top: 20rpx;
				right: 50rpx;
				left: 37%;
				width: 90rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				justify-content: center;
				vertical-align: middle;
				font-size: 50rpx;
				color: #FFFFFF;
				white-space: nowrap;
				opacity: 0.9;
				background-color: rgba(0, 0, 0, 0.05);
				background-size: cover;
				background-position: 50%;
				border-radius: 5000rpx;
			}

			/* 元素图标 end */
		}

		/* 列表元素 end */
	}

	/* 组件导航列表 end*/
	.tn-biangk {
		border: 1rpx solid #d9d9d9;
		border-radius: 10rpx;
		padding: 10rpx;
		box-shadow: 5px 5rpx 5rpx #d9d9d9;
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






	.king-list .king-icon {
		width: 100%;
		text-align: left;
		padding: 20rpx;
		font-size: 26rpx;
		color: #888;
		display: block;
	}

	.tn_hei {
		color: #000;
	}

	.tn-wihu {
		width: 100% !important;
	}

	.tn-pianyi {
		left: 44% !important;
	}

	.tn-body {
		padding: 40rpx;
	}

	.custom-title {
		padding-bottom: 10rpx;
	}

	.tn-bottom {
		padding-bottom: 10rpx;
	}
</style>
