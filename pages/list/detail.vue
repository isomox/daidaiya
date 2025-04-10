<template>
	<!--
	 This page displays daidai items based on the daidai schema
	 -->
	<view class="daidai-detail">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar :statusBar="true" :border="false"></uni-nav-bar>
		<!-- #endif -->

		<unicloud-db v-slot:default="{ data, loading, error, options }" :options="formData" :collection="colList"
			:getone="true" :manual="true" ref="detail" foreignKey="daidai.user_id" @load="loadData">
			<template v-if="!loading && data">
				<!-- Header with title -->
				<view class="header">
					<view class="article-title">{{ data.title }}</view>
					<view class="status-tag" :class="data.status === 0 ? 'ongoing' : 'completed'">
						{{ data.status === 0 ? '进行中' : '已完成' }}
					</view>
				</view>

				<!-- User info and type card -->
				<uni-card padding="10px 0">
					<view class="user-info-card">
						<view class="left-section">
							<image class="avatar"
								:src="data.user_id && data.user_id[0] && data.user_id[0].avatar || '/static/uni-center/headers.png'">
							</image>
							<view class="user-details">
								<view class="username">{{ data.user_id && data.user_id[0] && data.user_id[0].nickname ||
									'未知用户' }}</view>
								<view class="date-info">
									<uni-icons type="calendar" size="14"></uni-icons>
									<uni-dateformat :date="data.create_date" format="yyyy-MM-dd hh:mm"
										:threshold="[60000, 2592000000]" />
								</view>
							</view>
						</view>
						<view class="type-badge" :class="data.type === 1 ? 'provide' : 'need'">
							{{ data.type === 1 ? '提供帮助' : '需要帮助' }}
						</view>
					</view>
				</uni-card>



				<!-- Content sections -->
				<uni-section title="详细描述" type="line">
					<view class="content-block">{{ data.description || '暂无描述' }}</view>
				</uni-section>

				<!-- Tags section -->
				<uni-section title="标签" type="line" v-if="data.tags && data.tags.length">
					<view class="tags-container">
						<uni-tag v-for="(tag, index) in data.tags" :key="index" :text="tag" type="primary" size="small"
							:circle="true"></uni-tag>
					</view>
				</uni-section>

				<!-- Location section -->
				<uni-section title="地点信息" type="line" v-if="data.location">
					<view class="content-block location-block">
						<view v-if="data.location.name" class="location-name">
							<uni-icons type="location" size="16"></uni-icons>
							<text>{{ data.location.name }}</text>
						</view>
						<view v-if="data.location.address" class="location-address">{{ data.location.address }}</view>
					</view>
				</uni-section>

				<!-- Contact section with copy button -->
				<uni-section title="联系方式" type="line" v-if="data.contact_info">
					<view class="content-block contact-block">
						<view class="contact-info">{{ data.contact_info }}</view>
						<button class="copy-button" @click="copyContactInfo(data.contact_info)">复制</button>
					</view>
				</uni-section>

			</template>

			<template v-else-if="loading">
				<view class="loading-container">
					<uni-load-more status="loading" :contentText="loadMoreText"></uni-load-more>
				</view>
			</template>

			<template v-else>
				<uni-load-state :state="formData.noData"></uni-load-state>
			</template>
		</unicloud-db>
	</view>
</template>

<script>
// #ifdef APP-PLUS
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
const uniShare = new UniShare()
// #endif
const db = uniCloud.database();
export default {
	// #ifdef APP-PLUS
	components: {
		"uni-nav-bar": uniNavBar
	},
	onBackPress({ from }) {
		if (from == 'backbutton') {
			if (uniShare.isShow) {
				this.$nextTick(function () {
					uniShare.hide()
				})
			}
			return uniShare.isShow;
		}
	},
	// #endif
	data() {
		return {
			id: "",
			title: 'Daidai Item',
			loadMoreText: {
				contentdown: '上拉显示更多',
				contentrefresh: '加载中...',
				contentnomore: '没有更多数据了'
			},
			formData: {
				noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
			}
		}
	},
	computed: {
		uniStarterConfig() {
			return getApp().globalData.config
		},
		where() {
			return `_id =="${this.id}"`
		},
		colList() {
			return [
				db.collection('daidai').where(this.where).field('_id,title,description,type,status,tags,location,contact_info,user_id,create_date,image').getTemp(),
				db.collection('uni-id-users').field('_id,nickname,avatar').getTemp()
			]
		}
	},
	onLoad(event) {
		if (event.id) {
			this.id = event.id
		}
		if (event.title) {
			this.title = event.title
			uni.setNavigationBarTitle({
				title: event.title
			})
		}
	},
	onReady() {
		if (this.id) {
			this.$refs.detail.loadData()
		} else {
			uni.showToast({
				icon: 'none',
				title: '无法加载详情数据'
			})
		}
	},
	onNavigationBarButtonTap(event) {
		if (event.type == 'share') {
			this.shareClick();
		}
	},
	methods: {
		loadData(data) {
			if (!data || data.length === 0) {
				this.formData.noData = '<p style="text-align:center;color:#666">未找到数据</p>';
				return;
			}

			if (!this.title || this.title === 'Daidai Item') {
				this.title = data.title || 'Daidai Item';
				uni.setNavigationBarTitle({
					title: this.title
				});
			}
		},

		contactUser() {
			if (!this.$refs.detail.dataList || !this.$refs.detail.dataList.length) {
				uni.showToast({
					title: '数据加载中，请稍候',
					icon: 'none'
				});
				return;
			}

			const data = this.$refs.detail.dataList[0];
			if (data && data.contact_info) {
				uni.showModal({
					title: '联系方式',
					content: data.contact_info,
					confirmText: '复制',
					success: (res) => {
						if (res.confirm) {
							uni.setClipboardData({
								data: data.contact_info,
								success: () => {
									uni.showToast({
										title: '联系方式已复制',
										icon: 'success'
									});
								}
							});
						}
					}
				});
			} else {
				uni.showToast({
					title: '暂无联系方式',
					icon: 'none'
				});
			}
		},

		copyContactInfo(contactInfo) {
			uni.setClipboardData({
				data: contactInfo,
				success: () => {
					uni.showToast({
						title: '联系方式已复制',
						icon: 'success'
					});
				}
			});
		}
	}
}
</script>

<style lang="scss">
.daidai-detail {
	background-color: #f8f8f8;
	min-height: 100vh;
	padding-bottom: 30px;

	.header {
		padding: 20px 15px 10px;
		position: relative;

		.article-title {
			font-size: 22px;
			font-weight: bold;
			color: #333;
			padding: 0;
			margin-bottom: 10px;
			line-height: 1.4;
		}

		.status-tag {
			position: absolute;
			right: 15px;
			top: 20px;
			padding: 3px 10px;
			border-radius: 15px;
			font-size: 12px;
			color: white;

			&.ongoing {
				background-color: #2979ff;
			}

			&.completed {
				background-color: #8f8f8f;
			}
		}
	}

	.user-info-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;

		.left-section {
			display: flex;
			align-items: center;

			.avatar {
				width: 45px;
				height: 45px;
				border-radius: 50%;
				margin-right: 10px;
			}

			.user-details {
				.username {
					font-size: 16px;
					font-weight: 500;
					color: #333;
					margin-bottom: 4px;
				}

				.date-info {
					display: flex;
					align-items: center;
					font-size: 12px;
					color: #999;

					.uni-icons {
						margin-right: 4px;
					}
				}
			}
		}

		.type-badge {
			padding: 5px 10px;
			border-radius: 4px;
			font-size: 13px;
			color: white;

			&.provide {
				background-color: #04be02;
				/* Green for providing help */
			}

			&.need {
				background-color: #ff7500;
				/* Orange for needing help */
			}
		}
	}

	.banner {
		margin: 15px;
		height: 180px;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

		.banner-img {
			width: 100%;
			height: 100%;
		}
	}

	.content-block {
		padding: 15px;
		background-color: #fff;
		line-height: 1.6;
		color: #333;
		font-size: 15px;
	}

	.contact-block {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.contact-info {
			flex: 1;
			word-break: break-all;
			padding-right: 15px;
		}

		.copy-button {
			flex-shrink: 0;
			background-color: #2979ff;
			color: white;
			font-size: 14px;
			padding: 8px 15px;
			border-radius: 4px;
			height: auto;
			line-height: 1;
		}
	}

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		padding: 10px 15px;
		background-color: #fff;

		.uni-tag {
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}

	.location-block {
		.location-name {
			display: flex;
			align-items: center;
			font-weight: 500;
			margin-bottom: 5px;

			.uni-icons {
				margin-right: 5px;
				color: #2979ff;
			}
		}

		.location-address {
			color: #666;
			font-size: 14px;
			padding-left: 21px;
		}
	}

	.action-buttons {
		display: flex;
		justify-content: space-around;
		padding: 20px 15px;

		button {
			width: 45%;
			height: 45px;
			line-height: 45px;
			border-radius: 23px;
			font-size: 16px;
			font-weight: 500;

			&.contact-button {
				background-color: #2979ff;
				color: white;
			}

			&.share-button {
				background-color: white;
				color: #2979ff;
				border: 1px solid #2979ff;
			}
		}
	}

	.loading-container {
		padding: 30px 0;
	}
}
</style>
