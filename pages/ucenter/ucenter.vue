<template>
	<view class="center">
		<uni-sign-in ref="signIn"></uni-sign-in>
		<view class="userInfo" @click.capture="toUserInfo">
			<cloud-image width="150rpx" height="150rpx"
				v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url"
				:src="userInfo.avatar_file.url"></cloud-image>

			<view v-else class="defaultAvatarUrl">
				<uni-icons color="#ffffff" size="50" type="person-filled" />
			</view>

			<view class="logo-title">
				<text class="uer-name" v-if="hasLogin">{{ userInfo.nickname || userInfo.username || userInfo.mobile
				}}</text>
				<text class="uer-name" v-else>{{ $t('mine.notLogged') }}</text>
			</view>
		</view>
		<uni-list class="center-list" v-for="(sublist, index) in ucenterList" :key="index">
			<uni-list-item v-for="(item, i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{ type: item.icon, color: '#999' }">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{ item.rightText }}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
// #ifdef APP
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
const uniShare = new UniShare()
// #endif
const db = uniCloud.database();
import {
	store,
	mutations
} from '@/uni_modules/uni-id-pages/common/store.js'
export default {
	// #ifdef APP
	onBackPress({ from }) {
		if (from == 'backbutton') {
			this.$nextTick(function () {
				uniShare.hide()
			})
			return uniShare.isShow;
		}
	},
	// #endif
	data() {
		return {
			ucenterList: [
				[{
					"title": "互助发布",
					"to": '/pages/ucenter/daidai/publish',
					"icon": "plusempty"
				}],
				[{
					"title": this.$t('mine.feedback'),
					"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
					"icon": "help"
				}, {
					"title": this.$t('mine.settings'),
					"to": '/pages/ucenter/settings/settings',
					"icon": "gear"
				}],
				// #ifdef APP
				[{
					"title": this.$t('mine.about'),
					"to": '/pages/ucenter/about/about',
					"icon": "info"
				}]
				// #endif
			],
			listStyles: {
				"height": "150rpx", // 边框高度
				"width": "150rpx", // 边框宽度
				"border": { // 如果为 Boolean 值，可以控制边框显示与否
					"color": "#eee", // 边框颜色
					"width": "1px", // 边框宽度
					"style": "solid", // 边框样式
					"radius": "100%" // 边框圆角，支持百分比
				}
			}
		}
	},
	onLoad() {
	},
	onShow() { },
	computed: {
		userInfo() {
			return store.userInfo
		},
		hasLogin() {
			return store.hasLogin
		},
		// #ifdef APP-PLUS
		appVersion() {
			return getApp().appVersion
		},
		// #endif
		appConfig() {
			return getApp().globalData.config
		}
	},
	methods: {
		toSettings() {
			uni.navigateTo({
				url: "/pages/ucenter/settings/settings"
			})
		},
		signIn() { //普通签到
			this.$refs.signIn.open()
		},
		signInByAd() { //看激励视频广告签到
			this.$refs.signIn.showRewardedVideoAd()
		},
		/**
		 * 个人中心项目列表点击事件
		 */
		ucenterListClick(item) {
			if (!item.to && item.event) {
				this[item.event]();
			}
		},
		async checkVersion() {
			let res = await callCheckVersion()
			console.log(res);
			if (res.result.code > 0) {
				checkUpdate()
			} else {
				uni.showToast({
					title: res.result.message,
					icon: 'none'
				});
			}
		},
		toUserInfo() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
			})
		},
		/**
		 * 获取积分信息
		 */
		getScore() {
			if (!this.userInfo) return uni.showToast({
				title: this.$t('mine.checkScore'),
				icon: 'none'
			});
			uni.showLoading({
				mask: true
			})
			db.collection("uni-id-scores")
				.where('"user_id" == $env.uid')
				.field('score,balance')
				.orderBy("create_date", "desc")
				.limit(1)
				.get()
				.then((res) => {
					console.log(res);
					const data = res.result.data[0];
					let msg = '';
					msg = data ? (this.$t('mine.currentScore') + data.balance) : this.$t('mine.noScore');
					uni.showToast({
						title: msg,
						icon: 'none'
					});
				}).finally(() => {
					uni.hideLoading()
				})
		},
		async share() {
			let { result } = await db.collection('uni-id-users').where("'_id' == $cloudEnv_uid").field('my_invite_code').get()
			let myInviteCode = result.data[0].my_invite_code
			if (!myInviteCode) {
				return uni.showToast({
					title: '请检查uni-config-center中uni-id配置，是否已启用 autoSetInviteCode',
					icon: 'none'
				});
			}
			console.log({ myInviteCode });
			let {
				appName,
				logo,
				company,
				slogan
			} = this.appConfig.about
			// #ifdef APP
			uniShare.show({
				content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
					type: 0,
					href: this.appConfig.h5.url +
						`/#/pages/ucenter/invite/invite?code=uniInvitationCode:${myInviteCode}`,
					title: appName,
					summary: slogan,
					imageUrl: logo +
						'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
				},
				menus: [{
					"img": "/static/app/sharemenu/wechatfriend.png",
					"text": this.$t('common.wechatFriends'),
					"share": {
						"provider": "weixin",
						"scene": "WXSceneSession"
					}
				},
				{
					"img": "/static/app/sharemenu/wechatmoments.png",
					"text": this.$t('common.wechatBbs'),
					"share": {
						"provider": "weixin",
						"scene": "WXSceneTimeline"
					}
				},
				{
					"img": "/static/app/sharemenu/weibo.png",
					"text": this.$t('common.weibo'),
					"share": {
						"provider": "sinaweibo"
					}
				},
				{
					"img": "/static/app/sharemenu/qq.png",
					"text": "QQ",
					"share": {
						"provider": "qq"
					}
				},
				{
					"img": "/static/app/sharemenu/copyurl.png",
					"text": this.$t('common.copy'),
					"share": "copyurl"
				},
				{
					"img": "/static/app/sharemenu/more.png",
					"text": this.$t('common.more'),
					"share": "shareSystem"
				}
				],
				cancelText: this.$t('common.cancelShare'),
			}, e => { //callback
				console.log(e);
			})
			// #endif
		}
	}
}
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
view {
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
}

page {
	background-color: #f8f8f8;
}

/* #endif*/

.center {
	flex: 1;
	flex-direction: column;
	background-color: #f8f8f8;
}

.userInfo {
	padding-top: 60px;
	flex-direction: column;
	align-items: center;
	// background-color: #007aff;
	/* Replace background-image with a solid color */
}

.defaultAvatarUrl {
	width: 150rpx;
	height: 150rpx;
	background-color: #007aff;
	border-radius: 100%;
	justify-content: center;
	align-items: center;
}

.logo-title {
	flex: 1;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
}

.uer-name {
	height: 100rpx;
	line-height: 100rpx;
	font-size: 38rpx;
	color: #0a0909;
}

.center-list {
	margin-bottom: 30rpx;
	background-color: #f9f9f9;
}

.center-list-cell {
	width: 750rpx;
	background-color: #007AFF;
	height: 40rpx;
}

.grid {
	background-color: #FFFFFF;
	margin-bottom: 6px;
}

.uni-grid .text {
	font-size: 16px;
	height: 25px;
	line-height: 25px;
	color: #817f82;
}

.uni-grid .item ::v-deep .uni-grid-item__box {
	justify-content: center;
	align-items: center;
}


/*修改边线粗细示例*/
/* #ifndef APP-NVUE */
.center-list ::v-deep .uni-list--border:after {
	-webkit-transform: scaleY(0.2);
	transform: scaleY(0.2);
	margin-left: 80rpx;
}

.center-list ::v-deep .uni-list--border-top,
.center-list ::v-deep .uni-list--border-bottom {
	display: none;
}

/* #endif */
.item-footer {
	flex-direction: row;
	align-items: center;
}

.item-footer-text {
	color: #999;
	font-size: 24rpx;
	padding-right: 10rpx;
}

.item-footer-badge {
	width: 20rpx;
	height: 20rpx;
	/* #ifndef APP-NVUE */
	border-radius: 50%;
	/* #endif */
	/* #ifdef APP-NVUE */
	border-radius: 10rpx;
	/* #endif */
	background-color: #DD524D;
}
</style>
