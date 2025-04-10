<template>
	<view class="pages">
		<unicloud-db ref='udb' v-slot:default="{ data, pagination, hasMore, loading, error, options }"
			@error="onqueryerror" :collection="colList" :page-size="10" :where="where" :orderby="orderby">
			<!-- 基于 uni-list 的页面布局 -->
			<uni-list class="uni-list" :border="false" :style="{ height: listHight }">

				<!-- 作用于app端nvue页面的下拉加载 -->
				<!-- #ifdef APP-NVUE -->
				<refreshBox @refresh="refresh" :loading="loading"></refreshBox>
				<!-- #endif -->

				<!-- 列表渲染 -->
				<uni-list-item :to="'/pages/list/detail?id=' + item._id + '&title=' + item.title"
					v-for="(item, index) in data" :key="index" class="list-item">
					<!-- 通过body插槽定义布局 -->
					<template v-slot:body>
						<view class="main">
							<view class="card-header">
								<text class="title">{{ item.title }}</text>
								<view class="status-container">
									<uni-tag :text="(item.status === 0 || item.status === '0') ? '进行中' : '已完成'"
										:type="(item.status === 0 || item.status === '0') ? 'primary' : 'success'"
										size="small" />
								</view>
							</view>
							<view class="card-type">
								<uni-tag :text="(item.type === 1 || item.type === '1') ? '提供帮助' : '需要帮助'"
									:type="(item.type === 1 || item.type === '1') ? 'warning' : 'error'" size="small" />
							</view>
							<view class="tags">
								<uni-tag v-for="(tag, tagIndex) in item.tags || []" :key="tagIndex" :text="tag"
									size="small" :circle="true" inverted />
							</view>
							<view class="info">
								<view class="user-info">
									<text class="author">{{ item.user_id && item.user_id[0] ? item.user_id[0].nickname :
										'' }}</text>
									<uni-dateformat class="last_modify_date" :date="item.last_modify_date"
										format="yyyy-MM-dd" :threshold="[60000, 2592000000]" />
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>

				<!-- 加载状态：上拉加载更多，加载中，没有更多数据了，加载错误 -->
				<!-- #ifdef APP -->
				<uni-list-item>
					<template v-slot:body>
						<!-- #endif -->
						<uni-load-state class="load-state" @networkResume="refresh"
							:state="{ data, pagination, hasMore, loading, error }" @loadMore="loadMore">
						</uni-load-state>
						<!-- #ifdef APP -->
					</template>
				</uni-list-item>
				<!-- #endif -->
			</uni-list>
		</unicloud-db>

	</view>
</template>

<script>
let cdbRef;
import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";

const db = uniCloud.database();

export default {
	components: {
		statusBar
	},
	computed: {
		inputPlaceholder(e) {
			if (uni.getStorageSync('CURRENT_LANG') == "en") {
				return 'Please enter the search content'
			} else {
				return '请输入搜索内容'
			}
		},
		colList() {
			return [
				db.collection('daidai').field('_id,title,type,status,tags,last_modify_date,user_id').getTemp(),
				db.collection('uni-id-users').field('_id,nickname').getTemp()
			]
		}
	},
	data() {
		return {
			where: '"status" == 0', // 过滤条件：只显示进行中的项目
			orderby: 'last_modify_date desc', // 按 last_modify_date 降序排序
			showRefresh: false,
			listHight: 0
		}
	},
	async onReady() {
		cdbRef = this.$refs.udb
		// 设置页面标题
		uni.setNavigationBarTitle({
			title: "互助平台"
		});
	},
	async onShow() {
		getApp().globalData.searchText = ''
	},
	methods: {
		retry() {
			this.refresh()
		},
		refresh() {
			cdbRef.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
				// #ifdef APP-NVUE
				this.showRefresh = false
				// #endif
				console.log('end');
			})
			console.log('refresh');
		},
		loadMore() {
			cdbRef.loadMore()
		},
		onqueryerror(e) {
			console.error(e);
		},
		onpullingdown(e) {
			console.log(e);
			this.showRefresh = true
			if (e.pullingDistance > 100) {
				this.refresh()
			}
		}
	},
}
</script>

<style scoped>
/* #ifndef APP-NVUE */
view {
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
}

/* #endif */
.pages {
	background-color: #F5F5F5;
	padding: 10rpx;
}

.uni-list {
	background-color: transparent;
	padding: 10rpx;
}

.list-item {
	margin-bottom: 20rpx;
	border-radius: 12rpx;
	background-color: #FFFFFF;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.08);
	overflow: hidden;
	transition: transform 0.2s, box-shadow 0.2s;
}

.list-item:active {
	transform: scale(0.98);
	box-shadow: 0 1rpx 5rpx rgba(0, 0, 0, 0.05);
}

.main {
	flex: 1;
	padding: 20rpx 15rpx;
}

.card-header {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	line-height: 1.4;
	flex: 1;
}

.card-type {
	margin-bottom: 15rpx;
}

.tags {
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 15rpx;
}

.tags .uni-tag {
	margin-right: 10rpx;
	margin-bottom: 8rpx;
	font-size: 20rpx;
}

.info {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 10rpx;
	border-top: 1px solid #f0f0f0;
	padding-top: 10rpx;
}

.user-info {
	flex-direction: row;
	align-items: center;
}

.author {
	font-size: 24rpx;
	color: #666;
	margin-right: 15rpx;
}

.last_modify_date {
	font-size: 22rpx;
	color: #999;
}

.status-container {
	flex-direction: row;
	align-items: center;
}

.status-container .uni-tag {
	font-weight: 500;
}

.load-state {
	justify-content: center;
	width: 750rpx;
	padding: 20rpx 0;
}

.uni-search-box {
	background-color: #FFFFFF;
	position: sticky;
	height: 50px;
	top: 0;
	left: 0;
	/* #ifndef APP-PLUS */
	z-index: 9;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	width: 580rpx;
	/* #endif */
}

.cover-search-bar {
	height: 50px;
	position: relative;
	top: -50px;
	margin-bottom: -50px;
	/* #ifndef APP-NVUE */
	z-index: 999;
	/* #endif */
}
</style>
