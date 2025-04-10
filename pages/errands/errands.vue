<template>
	<view class="tn-safe-area-inset-bottom">

		<view class="tn-navbg" :style="{height: vuex_custom_bar_height + 'px'}">
			<!-- 顶部自定义导航 -->
			<tn-nav-bar fixed alpha customBack>
				<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
					<text class='icon tn-icon-left'></text>
					<text class='icon tn-icon-home-capsule-fill'></text>
				</view>
				<view class="toubu">
					跑腿平台跑男说明
				</view>
			</tn-nav-bar>
		</view>
		<view class="tn-search-fixed" style="background: linear-gradient(180deg, #D8E5FF, #FFFFFF);">
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin"
				:style="{paddingTop: vuex_custom_bar_height + 'px'}">
			</view>
		</view>
		<view class="tn-margin-bottom-lg body">
			<view class="">
				一、跑男职责
			</view>
			<view class="kongliange">
				跑男作为跑腿平台的核心服务人员，主要负责为客户提供各类跑腿服务，包括但不限于：代买、代送、代办等。通过高效、准确、贴心的服务，满足客户的多样化需求，提升客户的生活便利性和满意度。
			</view>
			<view class="">
				二、服务要求
			</view>
			<view class="kongliange">
				1、遵守平台规定：跑男需严格遵守跑腿平台的各项规定，包括但不限于服务时间、服务范围、收费标准等。
			</view>
			<view class="kongliange">
				2、保证服务质量：跑男应提供优质的服务，确保客户的满意度。在服务过程中，应保持礼貌、热情、耐心，积极解决客户的问题。
			</view>
			<view class="kongliange">
				3、保障客户隐私：跑男应尊重客户的隐私，不得泄露客户的个人信息和交易内容。
			</view>
			<view class="kongliange">
				4、遵守交通规则：跑男在配送过程中应遵守交通规则，确保安全行驶，避免因交通违规引发的安全问题。
			</view>
			<view class="">
				三、工作流程
			</view>
			<view class="kongliange">
				1、接收订单：跑男通过跑腿平台接收客户发布的订单，确认订单信息无误后，开始执行任务。
			</view>
			<view class="kongliange">
				2、执行任务：跑男根据订单要求，完成代买、代送、代办等任务。在任务执行过程中，应保持与客户的沟通，及时反馈任务进度。
			</view>
			<view class="kongliange">
				3、完成订单：任务完成后，跑男需在平台上确认订单完成，并将结果反馈给客户。客户确认无误后，订单即完成。
			</view>
			<view class="">
				四、奖励与惩罚
			</view>
			<view class="kongliange">
				1、奖励机制：平台将根据跑男的服务质量、订单量等因素，给予相应的奖励和补贴，激励跑男提供更优质的服务。
			</view>
			<view class="kongliange">
				2、惩罚措施：对于违反平台规定、服务质量差的跑男，平台将视情节轻重采取相应的惩罚措施，包括但不限于警告、罚款、解除合作等。
			</view>
			<view class="">
				五、跑男权益
			</view>
			<view class="kongliange">
				1、福利：跑男享有平台规定的佣金和福利待遇，包括基本佣金、补贴、奖励等。
			</view>
			<view class="kongliange">
				2、安全保障：平台为跑男提供必要的安全保障措施，如保险、培训等，确保跑男在执行任务过程中的安全。
			</view>
			<view class="kongliange">
				3、投诉与申诉：跑男在工作中遇到不公平待遇或纠纷时，可向平台投诉或申诉，平台将及时进行处理并保障跑男的合法权益。
			</view>
		</view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateSearch',
		mixins: [template_page_mixin],
		data() {
			return {
				inputValue: '',
				page: 1,
				limit: 10,
				title: "",
				list: []
			}
		},
		created() {

		},
		methods: {


		}
	}
</script>

<style lang="scss" scoped>
	.toubu {}

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

	.tn-search-fixed {
		position: fixed;
		top: 0rpx;
		width: 100%;
		transition: all 0.25s ease-out;
		z-index: 1;
	}

	.body {
		margin-top: 30rpx;
		padding: 40rpx;
		font-size: 28rpx;
		letter-spacing: 1rpx;
		line-height: 50rpx;
		color: #444;
	}

	.kongliange {
		text-indent: 2em;
	}
</style>
