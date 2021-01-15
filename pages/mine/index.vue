<template>
	<view>
		<view class="list-header">通用</view>
		<view class="list-container">
			<uni-list>
				<uni-list-item title="密码设置" link to="/pages/index/detail/index"></uni-list-item>
				<uni-list-item title="已实名认证" link></uni-list-item>
				<uni-list-item title="修改绑定手机号" link rightText="186****6981"></uni-list-item>
			</uni-list>
		</view>
		<view class="list-header">通用</view>
		<view class="list-container">
			<uni-list>
				<uni-list-item title="接收通知" :show-switch="true" @switchChange="switchChange"></uni-list-item>
				<uni-list-item title="常用功能设置" link></uni-list-item>
				<uni-list-item title="图片质量设置" link rightText="高清"></uni-list-item>
				<uni-list-item title="隐私设置" link></uni-list-item>
				<uni-list-item title="清理缓存(0.80M)" link></uni-list-item>
				<uni-list-item title="关于" link></uni-list-item>
			</uni-list>
		</view>
		<view class="logout-wrapper">
			<button type="warn">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				swiperCurrent: 0,
				swiperList: [{
						key: '0',
						content: 'asdoiasd'
					},
					{
						key: '1',
						content: 'wruwoeriu'
					},
					{
						key: '2',
						content: '阿萨德煎熬is的简欧'
					},
					{
						key: '3',
						content: '不我还是多放圣诞节哦鸡'
					},
				],
			}
		},
		methods: {
			onSwipperChange(e) {
				this.swiperCurrent = e.detail.current
			}
		},
		computed: {
			percentage() {
				return (this.swiperCurrent + 1) / this.swiperList.length * 100
			}
		}
	}
</script>

<style scoped>
	.list-header {
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		font-size: 12px;
		color: #999;
		background-color: #eee;
	}
	.list-container {
		padding: 0 10px;
	}
	.swiper-item {
		text-align: center;
	}
	.logout-wrapper {
		padding: 10px;
	}
</style>
