<script>
import initApp from '@/common/appInit.js';
import openApp from '@/common/openApp.js';
// #ifdef H5
openApp() //创建在h5端全局悬浮引导用户下载app的功能
// #endif
import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
export default {
	globalData: {
		searchText: '',
		appVersion: {},
		config: {},
		$i18n: {},
		$t: {}
	},
	onLaunch: function () {
		console.log('App Launch')
		this.globalData.$i18n = this.$i18n
		this.globalData.$t = str => this.$t(str)
		initApp();
		uniIdPageInit()
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
</style>
