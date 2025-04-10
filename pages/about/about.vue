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
					用户协议/合伙人协议
				</view>
			</tn-nav-bar>
		</view>
		<view class="tn-search-fixed" style="background: linear-gradient(180deg, #D8E5FF, #FFFFFF);">
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin"
				:style="{paddingTop: vuex_custom_bar_height + 'px'}">
			</view>
		</view>
		<view class="tn-margin-bottom-lg body">
			<view class="kongliange">
				任何用户在使用校园跑腿服务之前，请务必仔细阅读并同意本声明。如您不同意本声明，请立即停止使用校园跑腿所提供的相关服务。
			</view>
			<view class="kongliange">
				1.校园跑腿由武汉云晨有限公司开发。作为软件开发方仅为购买系统的平台运营团队提供软件开发及维护服务，不参与平台运营且不涉及财务利益。任何平台、商户、配送团队或用户之间在运营过程中而导致的利益纠纷或造成财产损失，校园跑腿不承担何责任。
			</view>
			<view class="kongliange">
				2.由于用户在非求助校园跑腿官方解决系统问题时，将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露，校园跑腿不负任何责任。
			</view>
			<view class="kongliange">
				3.用户如发现平台、商户或其他用户有违法或违反用户协议的行为，可以向校园跑腿进行反映要求处理。如用户因交易与平台、商户或其他用户产生诉讼的，用户有权通过司法部门要求校园跑腿提供相关资料。
			</view>
			<view class="kongliange">
				4.校园跑腿在此提示，您在使用校园跑腿服务期间应当遵守中华人民共和国的法律，不得危害网络安全，不得利用校园跑腿的服务从事侵犯他人名誉、隐私、知识产权和其他合法权益的活动。尽管有前述提示，校园跑腿不对您使用校园跑腿服务的用途和目的承担任何责任。
			</view>
			<view class="kongliange">
				5.本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。
			</view>
			<view class="kongliange">
				6.在软件服务期间，由于不可抗力 (火灾、洪灾、地震、战争、黑客攻击、第三方接口公司关闭接口等) 及非我司所能控制的其他原因致使软件无法提供某项服务的，校园跑腿可免于承担违约责任。
			</view>
			<view class="kongliange">
				7.校园跑腿之声明以及其修改权、更新权及最终解释权均属校园跑腿所有。
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

	.body{
		margin-top: 30rpx;
		padding: 40rpx;
		font-size: 28rpx;
		letter-spacing: 1rpx;
		line-height: 50rpx;
		color: #444;
	}
	
	.kongliange{
		text-indent:2em;
	}



</style>
