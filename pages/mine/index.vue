<template>
	<view class="container">
		<swiper :indicator-dots="true" :current="swiperCurrent" :autoplay="true" :interval="3000" :duration="1000" @change="onSwipperChange">
			<swiper-item v-for="item in swiperList" :key="item.key">
				<view class="swiper-item">{{ item.content }}</view>
			</swiper-item>
		</swiper>
		<progress :percent="percentage" show-info />
		<view v-if="swiperCurrent === 0">
			swiperCurrent是0
		</view>
		<view v-if="swiperCurrent === 1">
			swiperCurrent 变成了 1
		</view>
		<view v-if="swiperCurrent === 2">
			swiperCurrent 现在是 2
		</view>
		<view v-if="swiperCurrent === 3">
			swiperCurrent 的值 为 3
		</view>
		<view>
			<navigator url="/pages/index/index" open-type="switchTab" hover-class="other-navigator-hover">
				<button type="default">跳转index页面</button>
			</navigator>
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
	.swiper-item {
		text-align: center;
	}
</style>
