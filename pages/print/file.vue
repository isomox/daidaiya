<template>
	<view class="oa-content">

		<view class="" style="padding-bottom: 240rpx;">
			<view>
				<tn-notice-bar :list="list1"></tn-notice-bar>
			</view>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						待打印文件
					</view>
				</view>
			</view>

			<view class="tn-margin-left tn-margin-right tn-margin-bottom"
				style="background-color: #00C8B008;color: #00C8B0;border-radius: 10rpx;" v-for="(item, index) in filelist"
				:key="index" @click="tn('')">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
					<view class="justify-content-item tn-text-bold tn-text-left" style="width: 100%;">
						<view class="">
							<text class="">{{item.filename}}</text>
							<text class="tn-icon-close-fill tn-float-right tn-color-red" @click="del(index)"></text>
						</view>
						<view class="tn-padding-top-xs tn-text-sm">
							<text class="tn-icon-folder-fill "></text>
							<text class="tn-padding-left-xs">
								{{item.page}}页、{{item.paper==1?"A3":"A4"}}、{{item.weight==1?"80g":"70g"}}、{{item.mian==1?"双面":"单面"}}、{{item.zhuang==1?"订书针装订":"不需装订"}}、{{item.yemun}}份
							</text>
							<text class="tn-padding-left-xs tn-float-right" @click="dayin(item,index)">打印设置></text>
						</view>
					</view>
					<!-- <view class="justify-content-item shanyi">
						<text class="tn-icon-close-fill"></text>
					</view> -->
				</view>
			</view>



			<!-- 悬浮按钮-->
			<view class="tn-flex tn-footerfixed tn-padding">
				<view class="tn-flex-1 justify-content-item tn-text-center">
					<tn-button backgroundColor="#55aaff " padding="40rpx 0" width="90%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" @click="shangchuan">
						<text class="">上传文件</text>
					</tn-button>
				</view>
				<view class="tn-flex-1 justify-content-item tn-text-center">
					<tn-button backgroundColor="#ffaa7f " padding="40rpx 0" width="90%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" @click="tn('./zhifu')">
						<text class="">立即下单</text>
					</tn-button>
				</view>
			</view>



		</view>
		<tn-popup v-model="show" mode="bottom" :closeBtn="true">
			<view class="tn-padding">
				<tn-list-view unlined="bottom" :customTitle="true">
					<template slot="title">
						<view class="custom-title tn-text-center tn-padding-bottom">
							打印设置
						</view>
					</template>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						打印份数 
						<tn-number-box v-model="bydata.yemun" class="tn-float-right"></tn-number-box>
					</tn-list-cell>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						纸张尺寸 
						<text class="tn-float-right" :class="bydata.paper==1?'xuan':'wei'" @click="paper(1)"> A3</text> 
						<text class="tn-float-right" :class="bydata.paper==0?'xuan':'wei'" @click="paper(0)">A4</text>
						
					</tn-list-cell>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						纸张克数 
						<text class="tn-float-right" :class="bydata.weight==1?'xuan':'wei'" @click="weight(1)">80g</text>
						<text class="tn-float-right" :class="bydata.weight==0?'xuan':'wei'" @click="weight(0)"> 70g</text> 
					</tn-list-cell>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						单双面 
						<text class="tn-float-right" :class="bydata.mian==1?'xuan':'wei'" @click="mian(1)">双面</text>
						<text class="tn-float-right" :class="bydata.mian==0?'xuan':'wei'" @click="mian(0)"> 单面</text> 
					</tn-list-cell>
					<tn-list-cell :arrow="cellArrow" :arrowRight="cellArrowRight" :unlined="cellUnlined"
						:lineLeft="cellLineLeft" :lineRight="cellLineRight">
						装订 
						<text class="tn-float-right" :class="bydata.zhuang==1?'xuan':'wei'" @click="zhuang(1)">订书针装订</text>
						<text class="tn-float-right" :class="bydata.zhuang==0?'xuan':'wei'" @click="zhuang(0)"> 不需装订</text> 
					</tn-list-cell>
				</tn-list-view>
				<view class="tn-margin-top-sm justify-content-item tn-text-center">
					<tn-button  padding="40rpx 0" width="90%" :fontSize="28"
						fontColor="#FFFFFF" backgroundColor="#ffaa7f" @click="baocun()" >确定</tn-button>
				</view> 
			</view>
		</tn-popup>
		<tn-tips ref="tips" position="center"></tn-tips>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateCost',
		mixins: [template_page_mixin],
		data() {
			return {
				list1: [
					'打印默认设置黑白打印'
				],
				filelist:[],
				show: false,
				bydata:{
					 filename:"",
					 fileurl:"",
					 page:0,
					 paper:0,
					 weight:0,
					 mian:0,
					 zhuang:0,
					 yemun:1,
					 pay:0
				},
				index:0,
				action:"",
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
			this.filelist=uni.getStorageSync('filelist');
		},
		methods: {
			// 弹出Picker
			dayin(e,i) {
				this.index=i;
				this.bydata={
					filename:e.filename,
					fileurl:e.fileurl,
					page:e.page,
					paper:e.paper,
					weight:e.weight,
					mian:e.mian,
					zhuang:e.zhuang,
					yemun:e.yemun,
					pay:e.pay
				}
				this.show = true
			},
			paper(a){
				this.bydata.paper=a
			},
			weight(a){
				this.bydata.weight=a
			},
			mian(a){
				this.bydata.mian=a
			},
			zhuang(a){
				this.bydata.zhuang=a
			},
			baocun(){
				this.filelist[this.index]=this.bydata;
				this.show=false;
			},
			del(e){
				let list=this.filelist;
				// this.filelist=list.splice(e, 1);
				let newArray = list.slice(0, 1).concat(list.slice(2));
				console.log(newArray)
				this.filelist=newArray
				uni.setStorageSync("filelist", newArray)
				// console.log(list.splice(1, e))
			},
			tn(e){
				uni.setStorageSync("filelist", this.filelist)
				uni.navigateTo({
					url:e
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
							// console.log(0)
							
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
										 console.log(1)
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
				// console.log(12)
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
				this.filelist=uni.getStorageSync('filelist');
				
			}

		}
	}
</script>

<style lang="scss" scoped>
	/* 间隔线 start*/
	.tn-strip-bottom-min {
		width: 100%;
		border-bottom: 1rpx solid #F8F9FB;
	}

	.tn-strip-top {
		width: 100%;
		border-top: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 160rpx;
		height: calc(180rpx + env(safe-area-inset-bottom) / 2);
		height: calc(180rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(40rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);
	}

	/* 底部悬浮按钮 end*/
	.xuan{
		background-color: #ffaa7f;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}
	.wei{
		background-color: #949494;
		color: #fff;
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border-radius: 10rpx;
	}
	.shanyi{
		margin-top: -30rpx;
	}
</style>
