<template>
	<view class="oa-content">

		<view class="" style="padding-bottom: 240rpx;">


			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index==1">
				<view class="tn-flex tn-flex-wrap">
					<view class="tn-flex-basic-md" v-for="(item, index) in tuniaoData" :key="index">
						<view class="tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur "
							:class="did==index?'yance-tion':'yance'" @click="jian(index)">
							<view class="title">{{item.title}}</view>
							<view class="shuoming">{{item.value}}</view>
						</view>
					</view>

				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index==2">
				<view class="tn-flex tn-flex-wrap">
					<view class="tn-flex-basic-md" v-for="(item, index) in peiData" :key="index">
						<view class="tn-padding-sm tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur "
							:class="tid==index?'yance-tion':'yance'" @click="ti(index)">
							<view class="title">{{item.title}}</view>
						</view>
					</view>

				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index==1"  @click="tn('/pages/kuaidi/kuaidi')">
				<view class="justify-content-item" >
					<view class="tn-text-bold tn-text-lg">
						快递商家 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
					<view class="tn-color-gray tn-padding-top-xs"  >
						{{shangjia==""?"未选择":shangjia}}
						
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey" >
					<view class="tn-icon-commissary tn-padding-top"></view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" @click="tn('/pages/address/address?lx=1')">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						联系人 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
					<view class="tn-color-gray tn-padding-top-xs" v-if="address">
						{{address.name}} / {{address.phone}}
					</view>
					<view class="tn-color-gray tn-padding-top-xs" v-if="!address">
						
						请选择
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey" >
					<view class="tn-icon-my-add tn-padding-top"></view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index==1">
				<view class="justify-content-item">
					<view class="content tn-flex tn-flex-direction-row tn-flex-col-center ">
						<view class="tn-text-bold tn-text-lg">
							快递件数<text class="tn-color-red tn-padding-left-xs">*</text>
						</view>
						<view class="content__data tn-flex-1">
							<tn-input type="number" v-model="jianshu" placeholder="请输入快递件数" @blur="getpay()"></tn-input>
						</view>
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-write tn-padding-top"></view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index<4">
				<view class="justify-content-item">
					<view class="content tn-flex tn-flex-direction-row tn-flex-col-center ">
						<view class="tn-text-bold tn-text-lg">
							打赏金额<text class="tn-color-red tn-padding-left-xs">*</text>
						</view>
						<view class="content__data tn-flex-1">
							<tn-input type="number" v-model="pay" placeholder="请输入打赏金额" @blur="getpay()"></tn-input>
						</view>
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-money tn-padding-top"></view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-if="index>3">
				<view class="justify-content-item">
					<view class="content tn-flex tn-flex-direction-row tn-flex-col-center ">
						<view class="tn-text-bold tn-text-lg">
							预定金额<text class="tn-color-red tn-padding-left-xs">*</text>
						</view>
						<view class="content__data tn-flex-1">
							{{pay}}元
						</view>
					</view>
				</view>
			</view>
			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding"  @click="tn('/pages/coupon/coupon?lxid=1&money='+amount)">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						优惠券  
					</view>
					<view class="tn-color-gray tn-padding-top-xs" v-if="coupon">
						{{coupon.title}} 
					</view>
					<view class="tn-color-gray tn-padding-top-xs" v-if="!coupon">
						
						无
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-coupon tn-padding-top"></view>
				</view>
			</view>
			<picker @change="timebindPickerChange" :value="tindex" :range="timelist" v-if="index==1">
				<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding">
					<view class="justify-content-item">
						<view class="tn-text-bold tn-text-lg">
							预计送达时间 <text class="tn-color-red tn-padding-left-xs">*</text>
						</view>

						<view class="tn-color-black tn-padding-top-xs">
							{{yjtime}}
							<!-- {{timelist[tindex]}} -->
						</view>
					</view>
					<view class="justify-content-item tn-text-lg tn-color-grey">
						<view class="tn-icon-time tn-padding-top"></view>
					</view>
				</view>
			</picker>
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-strip-top" v-if="index>2">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						上传附件
					</view>
				</view>
				<view class="justify-content-item tn-text-xl tn-color-grey">
					<!-- <view class="tn-icon-add-circle"></view> -->
					
					<!-- <tn-image-upload :customBtn="true" :deleteable="false"  :showUploadList="false"  :showProgress="false" :action="action" @on-success="success"  :limitType="limitType"> -->
						<view  class="tn-image-upload__custom-btn" @click="shangchuan">
							<view class="tn-icon-add-circle"></view>
						</view>
					<!-- </tn-image-upload> -->
				</view>
			</view>
			<view class="tn-margin-left tn-margin-right tn-margin-bottom" v-if="index>2"
				style="background-color: #00C8B008;color: #00C8B0;border-radius: 10rpx;">
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
					<view class="justify-content-item tn-text-bold tn-text-left" style="width: 80%;">
						<view class="">
							<text class="">{{filename}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
				<view class="tn-flex justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						{{array[index]}}相关信息 <text class="tn-color-red tn-padding-left-xs">*</text>
					</view>
				</view>
				<view class="tn-flex justify-content-item tn-color-gray">
					100字内
				</view>
			</view>

			<view class="tn-bg-gray--light tn-padding" style="border-radius: 10rpx;margin: 0 30rpx 30rpx 30rpx;">
				<textarea maxlength="100" placeholder="请输入相关信息内容" v-model="illustrate" placeholder-style="color:#AAAAAA"
					style="height: 160rpx;"></textarea>
			</view>
			<view class="tn-bg-gray--light tn-padding txt" style="border-radius: 10rpx;margin: 0 30rpx 30rpx 30rpx;">
				<view>
					<text class="tn-icon-creative"></text>平台发的仅仅是服务费，涉及到额外花销请在私信中与接单员沟通后具体支付方式；
					无人接单时建议重新下单，给跑腿小哥多加一个打赏钱哈~
				</view>
				<view>
					毕业设计、论文答辩下单，会有专业人员为你服务哦~
				</view>
				<view>
					请勿在平台发布违纪违规内容，一经发现即通报学校相关领导！
				</view>

			</view>


			<!-- 悬浮按钮-->
			<view class="tn-flex tn-footerfixed tn-padding">
				<view class="tn-flex-1 justify-content-item   tn-text-center">
					<tn-button backgroundColor="#00C8B0 " padding="40rpx 0" width="100%" :fontSize="28"
						fontColor="#FFFFFF" shape="round" @click="xiadan()">
						<text class="" v-if="coupon">立即支付 ¥:{{amount-coupon.sub}}</text>
						<text class="" v-if="!coupon">立即支付 ¥:{{amount}}</text>
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
		name: 'TemplateReport',
		mixins: [template_page_mixin],
		data() {
			return {
				school:null,
				sid: 0,
				index: 0,
				array: ['代买服务', '快递代取', '陪替服务', '急事代办', '毕业设计', '论文答辩'],
				slist: ['跑腿任务', '平台接单'],
				tindex: 0,
				timelist: ['不限送达时间', '12:00到14:00', '17:00到19:00', '19:00到22:00'],
				pay: "",
				yjtime:"不限送达时间",
				tuniaoData: [],
				shangjia:"",
				did: 0,
				jianshu: "",
				amount:0,
				peiData: [{
						title: '游戏陪玩',
					},
					{
						title: '游戏代练',
					},
					{
						title: '替占座位',
					},
					{
						title: '替代排队',
					}
				],
				tid: 0,
				address:null,
				illustrate:"",
				title:"",
				filename:"请上传10M以内，PDF文件",
				fileurl:"",
				action:"",
				
				limitType:['pdf','PDF'],
				coupon:null
			}
		},
		onLoad(e) {
			
			// this.school= uni.getStorageSync('school');
			if (e.lx > 0) {
				this.index = e.lx
			}
			if (this.index > 3) {
				this.pay = 150;
			}
			uni.setNavigationBarTitle({
				title: this.array[this.index]
			});
			uni.removeStorageSync('coupon');
			uni.removeStorageSync('kuaidi');
			uni.removeStorageSync('address');
		},
		onShow() {
			this.tuniaoData=[{
					title: '小件: ¥'+uni.getStorageSync('school').smallPiece,
					value: '巴掌大小的快件',
					pay: uni.getStorageSync('school').smallPiece
				},
				{
					title: '中件: ¥'+uni.getStorageSync('school').centrePiece,
					value: '鞋服盒子大小的快件',
					pay: uni.getStorageSync('school').centrePiece
				},
				{
					title: '大件: ¥'+uni.getStorageSync('school').bigPiece,
					value: '重量5公斤左右',
					pay: uni.getStorageSync('school').bigPiece
				},
				{
					title: '超大件: ¥'+uni.getStorageSync('school').largePiece,
					value: '重量超过8公斤',
					pay: uni.getStorageSync('school').largePiece
				}
			]
			this.action=this.$http.commoneUrl+'file/imges';
			if(uni.getStorageSync('kuaidi')){
				this.shangjia=uni.getStorageSync('kuaidi')
			}
			this.address=uni.getStorageSync('address')
			
			this.coupon=uni.getStorageSync('coupon')
			this.getpay();
		},
		methods: {
			jian(e) {
				this.did = e
				this.getpay();
			},
			ti(e) {
				this.tid = e
				this.title=this.peiData[e].title
			},
			bindPickerChange: function(e) {
				this.sid = e.detail.value
			},
			timebindPickerChange: function(e) {
				let tindex = e.detail.value
				
				this.yjtime=this.timelist[tindex]
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			getpay(){
				let lx=this.index;
				let zpay;
				
				if(lx==1){
					// console.log(11,this.did,this.tuniaoData[this.did].pay)
					let pay=this.tuniaoData[this.did].pay;
					// console.log(22,pay)
					let jianshu=0;
					if(this.jianshu!=""){
						jianshu=this.jianshu;
					}
					let a=0;
					if(this.pay!=""){
						a=this.pay;
					}
					zpay=pay*jianshu+parseInt(a);
					
				}else{
					let a=0;
					if(this.pay!=""){
						a=this.pay;
					}
					zpay=a;
				}
				
				this.amount=zpay;
			},
			xiadan(){
				let a=0;
				if(this.pay!=""){
					a=this.pay;
				}
				if(this.amount<2){
					this.$refs.tips.show({
					  msg: '跑腿金额不得小于2元',
					  backgroundColor: '#E83A30',
					  fontColor: '#FFFFFF',
					  duration: 1500
					})
				}else{
					let data={
						schoolid:uni.getStorageSync('school').id,
						title:this.title,
						lxid:this.index,
						name:this.address.name,
						phone:this.address.phone,
						address:this.address.address,
						shangjia:this.shangjia,
						jianshu:this.jianshu,
						pay:a,
						amount:this.amount,
						yjtime:this.yjtime,
						filename:this.filename,
						fileurl:this.fileurl,
						illustrate:this.illustrate,
						uid:uni.getStorageSync('uid'),
						coupon:this.coupon
						
					}
					// console.log(data)
					this.$http.postRequest('OrderList/getSign',data )
						.then(res => {
							uni.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(itme) {
								  uni.switchTab({
								  	url:'/pages/index/index'
								  })
								  // this.tn();
								},
								fail: function(err) {
								  console.log('支付失败',err)
								}
							})
						})
				}
				
			},
			success(data, index, lists, name){
				this.fileurl=data.data;
				this.filename="文件上传成功";
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
										 _that.filename=filename;
										  _that.fileurl=datalisy.data;
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
			youhuijuan(amount){
				let pay=amount;
				if(this.coupon){
					if(amount>this.coupon.sub){
						
					}
				}
				this.amount=pay
			}
			

		}
	}
</script>

<style lang="scss" scoped>
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
		font-size: 32rpx;

		.icon {
			display: block;
			flex: 1;
			margin: auto;
			text-align: center;
		}

	}

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
	.yance {
		// border: 2rpx solid #e8e3e8; 
		text-align: center;
		line-height: 40rpx;
		background-color: #f5f1f5;
		color: #444;
	}

	.yance-tion {
		// border: 2rpx solid #00C8B0; 
		text-align: center;
		line-height: 40rpx;
		background-color: #00e7c8;
		color: #fff;
	}

	.title {
		font-weight: 600;
	}

	.txt {
		color: #ffaa00;
		font-size: 28rpx;
		line-height: 48rpx;
		letter-spacing: 1rpx;
	}
</style>