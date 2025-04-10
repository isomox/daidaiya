<template>
	<view class="page-container">
		<view class="form-header">
			<text class="form-title">发布互助信息</text>
			<text class="form-subtitle">填写信息，连接需要的人</text>
		</view>
		
		<view class="container">
			<uni-forms ref="form" :model="formData" :rules="rules" validateTrigger="submit">
				<view class="form-card">
					<uni-forms-item name="title" label="标题" required>
						<uni-easyinput v-model="formData.title" placeholder="请输入标题" />
					</uni-forms-item>
					
					<uni-forms-item name="description" label="详细描述">
						<textarea 
							v-model="formData.description"
							placeholder="请输入详细描述" 
                            auto-height
							class="description-textarea"
						></textarea>
					</uni-forms-item>
					
					<uni-forms-item name="type" label="类型" required>
						<view class="type-selector">
							<view 
								v-for="(item, index) in typeOptions" 
								:key="index"
								class="type-option"
								:class="{ 'type-active': formData.type === item.value }"
								@click="formData.type = item.value"
							>
								<text class="type-icon">{{ item.value === 1 ? '👋' : '🙏' }}</text>
								<text>{{ item.text }}</text>
							</view>
						</view>
					</uni-forms-item>
				</view>
				
				<view class="form-card">
					<uni-forms-item name="tags" label="标签" required>
						<view class="tags-container">
							<view 
								v-for="(tag, index) in availableTags" 
								:key="index" 
								class="tag-item" 
								:class="{ active: formData.tags.includes(tag) }"
								@click="toggleTag(tag)"
							>
								{{ tag }}
							</view>
						</view>
						<view class="custom-tag">
							<uni-easyinput v-model="customTag" placeholder="添加自定义标签" />
							<button class="add-tag-btn" @click="addCustomTag">添加</button>
						</view>
					</uni-forms-item>
				</view>
				
				<view class="form-card">
					<uni-forms-item name="location" label="地点">
						<view class="location-wrapper">
							<view class="location-inputs">
								<uni-easyinput v-model="formData.location.name" placeholder="地点名称" />
								<uni-easyinput v-model="formData.location.address" placeholder="详细地址" />
							</view>
							<button class="location-btn" @click="chooseLocation">
								<text class="location-icon">📍</text> 选择位置
							</button>
						</view>
					</uni-forms-item>
					
					<uni-forms-item name="contact_info" label="联系方式">
						<uni-easyinput v-model="formData.contact_info" placeholder="请输入联系方式" />
					</uni-forms-item>
				</view>
				
				<view class="form-actions">
					<button type="default" class="cancel-btn" @click="navigateBack">取消</button>
					<button type="primary" class="submit-btn" @click="submitForm">发布</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					title: '',
					description: '',
					type: 1,
					tags: [],
					location: {
						name: '',
						address: '',
						longitude: 0,
						latitude: 0
					},
					contact_info: '',
					status: 0,
					user_id: '' // User ID field
				},
				customTag: '',
				availableTags: ['学习', '生活', '出行', '工作', '健康', '技能', '其他'],
				typeOptions: [
					{
						text: '提供帮助',
						value: 1
					},
					{
						text: '需要帮助',
						value: 2
					}
				],
				rules: {
					title: {
						rules: [
							{
								required: true,
								errorMessage: '请输入标题'
							},
							{
								maxLength: 100,
								errorMessage: '标题不能超过100个字符'
							}
						]
					},
					type: {
						rules: [
							{
								required: true,
								errorMessage: '请选择类型'
							}
						]
					},
					tags: {
						rules: [
							{
								required: true,
								errorMessage: '请至少选择一个标签'
							}
						]
					}
				}
			}
		},
		onLoad: async function(options) {
				// Get user ID using getCurrentUserInfo
				this.formData.user_id = uniCloud.getCurrentUserInfo().uid
				
				// If it's edit mode, load existing data
				if (options && options.id) {
					this.loadExistingData(options.id)
				}
				
				// Check if user is logged in
				if (!this.formData.user_id) {
					this.redirectToLogin()
				}
			},
		methods: {
			toggleTag(tag) {
				const index = this.formData.tags.indexOf(tag);
				if (index === -1) {
					this.formData.tags.push(tag);
				} else {
					this.formData.tags.splice(index, 1);
				}
			},
			addCustomTag() {
				if (this.customTag && this.customTag.trim() !== '') {
					if (!this.formData.tags.includes(this.customTag)) {
						this.formData.tags.push(this.customTag);
					}
					this.customTag = '';
				}
			},
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.formData.location.name = res.name;
						this.formData.location.address = res.address;
						this.formData.location.longitude = res.longitude;
						this.formData.location.latitude = res.latitude;
					}
				});
			},
			async loadExistingData(id) {
				try {
					const db = uniCloud.database();
					const result = await db.collection('daidai').doc(id).get();
					if (result.data && result.data.length > 0) {
						const data = result.data[0];
						this.formData = {
							...this.formData,
							...data
						};
					}
				} catch (e) {
					uni.showToast({
						title: '加载数据失败',
						icon: 'none'
					});
					console.error(e);
				}
			},
			submitForm() {
				// Check if user is authenticated before submission
				if (!this.formData.user_id) {
					this.redirectToLogin()
					return
				}
				
				this.$refs.form.validate().then(async (res) => {
					try {
						uni.showLoading({
							title: '提交中...'
						});
						
						const db = uniCloud.database();
						let result;
						const currentTimestamp = Date.now(); // Get current timestamp
						
						
						// 新增
						this.formData.create_date = currentTimestamp;
						this.formData.last_modify_date = currentTimestamp;
						result = await db.collection('daidai').add(this.formData);
						
						uni.hideLoading();
						
						
						uni.showToast({
							title: '发布成功',
							icon: 'success'
						});
							
						// 返回上一页
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
						
					} catch (e) {
						uni.hideLoading();
						uni.showToast({
							title: '发布失败',
							icon: 'none'
						});
						console.error(e);
					}
				}).catch((errors) => {
					console.log('表单校验失败', errors);
				});
			},
			redirectToLogin() {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				
				// Navigate to login page after a short delay
				setTimeout(() => {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
					})
				}, 1500)
			},
			navigateBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.page-container {
		padding: 20rpx;
		background-color: #f8f8f8;
		min-height: 100vh;
	}
	
	.form-header {
		text-align: center;
		margin: 30rpx 0 50rpx 0;
		animation: fadeIn 0.8s ease;
	}
	
	.form-title {
		font-size: 40rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.form-subtitle {
		font-size: 28rpx;
		color: #888;
		display: block;
	}
	
	.container {
		padding: 10rpx;
	}
	
	.form-card {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		animation: slideUp 0.5s ease;
		
		&:hover {
			transform: translateY(-2rpx);
			box-shadow: 0 6rpx 25rpx rgba(0, 0, 0, 0.1);
		}
	}
	
	.type-selector {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
	}
	
	.type-option {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 20rpx;
		border: 1rpx solid #e0e0e0;
		border-radius: 12rpx;
		margin-right: 20rpx;
		cursor: pointer;
		transition: all 0.3s ease;
		
		&:last-child {
			margin-right: 0;
		}
		
		&.type-active {
			background-color: rgba(0, 122, 255, 0.08);
			color: #007AFF;
			border-color: #007AFF;
			transform: scale(1.02);
		}
	}
	
	.type-icon {
		font-size: 48rpx;
		margin-bottom: 16rpx;
		display: block;
	}
	
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx 0;
	}
	
	.tag-item {
		padding: 12rpx 24rpx;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		transition: all 0.2s ease;
		border: 1px solid transparent;
		
		&:active {
			transform: scale(0.95);
		}
		
		&.active {
			background-color: #007AFF;
			color: #ffffff;
			box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.3);
		}
	}
	
	.custom-tag {
		display: flex;
		margin-top: 10rpx;
		
		.add-tag-btn {
			margin-left: 20rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 26rpx;
			background-color: #007AFF;
			color: #fff;
			border-radius: 8rpx;
			padding: 0 30rpx;
		}
	}
	
	.location-wrapper {
		width: 100%;
	}
	
	.location-inputs {
		margin-bottom: 20rpx;
	}
	
	.location-btn {
		background-color: #f0f7ff;
		color: #007AFF;
		border: 1px solid #007AFF;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		width: 100%;
		margin-top: 10rpx;
		font-size: 28rpx;
		transition: all 0.3s ease;
		
		&:active {
			background-color: #e0efff;
		}
	}
	
	.location-icon {
		margin-right: 10rpx;
		font-size: 32rpx;
	}
	
	.form-actions {
		margin-top: 80rpx;
		margin-bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		
		.submit-btn, .cancel-btn {
			width: 45%;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: bold;
			transition: all 0.3s ease;
		}
		
		.submit-btn {
			background-color: #007AFF;
			box-shadow: 0 10rpx 20rpx rgba(0, 122, 255, 0.3);
			
			&:active {
				transform: translateY(3rpx);
				box-shadow: 0 5rpx 10rpx rgba(0, 122, 255, 0.2);
			}
		}
		
		.cancel-btn {
			background-color: #f5f5f5;
			color: #666;
			
			&:active {
				background-color: #e8e8e8;
			}
		}
	}
	
	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	
	@keyframes slideUp {
		0% { 
			transform: translateY(20rpx); 
			opacity: 0; 
		}
		100% { 
			transform: translateY(0);
			opacity: 1;
		}
	}
	
	/* Style overrides for uni components */
	:deep(.uni-forms-item__label) {
		font-size: 30rpx;
		color: #333;
		font-weight: 600;
	}
	
	:deep(.uni-easyinput__content) {
		border-radius: 8rpx !important;
		height: 80rpx;
		
		.uni-easyinput__content-input {
			height: 80rpx;
			font-size: 28rpx;
		}
	}
	
	.description-textarea {
		width: 100%;
		height: 220rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 1.5;
		background-color: #F8F8F8;
		border: 1px solid #DDDDDD;
		border-radius: 8rpx;
		overflow-y: auto;
	}
	
	:deep(.uni-textarea) {
		min-height: 220rpx !important;
		padding: 20rpx;
	}
</style>