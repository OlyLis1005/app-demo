<template>
	<view>
		<view class="navbar">
			<view class="city-select">
				<image class="list-icon" src="../../static/pages/home/list.svg"></image>
				广州
			</view>
			<view class="search-bar-wrapper">
				<input v-model="listQuery.query" class="search-bar" placeholder="快速搜索台区智能终端" :radius="36" @confirm="handleConfirm" />
			</view>
		</view>
		<view class="list">
			<view class="list-item" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
				<view class="list-item-title">
					{{item.title}}
					<text class="item-status" :class="{ 'error': item.status === '0' }">{{item.status | statusFilter}}</text>
				</view>
				<view class="list-item-info clearfix">
					<view class="info-left">
						<view class="info-item">
							<text class="info-item-label">台区售电量：</text>
							12345
						</view>
						<view class="info-item">
							<text class="info-item-label">台区供电量：</text>
							23333
						</view>
					</view>
					<view class="info-right">
						<view class="info-item">
							<text class="info-item-label">台区线损电量：</text>
							1000
						</view>
						<view class="info-item">
							<text class="info-item-label">台区线损值：</text>
							5%
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniIcons},
		data() {
			return {
				listQuery: {
					query: ''
				},
				list: [
					{ id: 0, title: '终端No.000000010(22016893982)', status: '1', a: '13223', b: '123156', c: '12445', d: '123123' },
					{ id: 1, title: '终端No.000000010(22016893982)', status: '0', a: '13223', b: '123156', c: '12445', d: '123123' },
					{ id: 2, title: '终端No.000000010(22016893982)', status: '1', a: '13223', b: '123156', c: '12445', d: '123123' },
					{ id: 3, title: '终端No.000000010(22016893982)', status: '1', a: '13223', b: '123156', c: '12445', d: '123123' },
					{ id: 4, title: '终端No.000000010(22016893982)', status: '1', a: '13223', b: '123156', c: '12445', d: '123123' },
					{ id: 5, title: '终端No.000000010(22016893982)', status: '1', a: '13223', b: '123156', c: '12445', d: '123123' },
				]
			}
		},
		onLoad() {},
		methods: {
			handleConfirm() {
				console.log('searchValue', this.listQuery.query)
			},
			toDetail(id) {
				console.log('toDetail');
				uni.navigateTo({
					url: `/pages/index/detail/index?id=${id}`,
					success() {
						console.log('success');
					},
					fail(e) {
						console.log(e);
					}
				})
			}
		},
		filters: {
			statusFilter(code) {
				switch(code) {
					case '0':
					return '异常'
					case '1':
					return '正常'
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.navbar {
		background-color: #E44B4E;
		display: flex;
		padding: 10px 10px;
	}

	.city-select {
		width: 30%;
		color: #fff;
		line-height: 26px;
		.list-icon {
			width: 20px;
			height: 20px;
			position: relative;
			top: 5px;
			margin-right: 5px;
		}
	}

	.search-bar-wrapper {
		background-color: #E44B4E;
		flex: 1;
	}

	.search-bar {
		text-align: left;
		background: #eee;
		height: 26px;
		line-height: 26px;
		border-radius: 13px;
		padding: 0 10px;
		text-align: center;
		font-size: 12px;
		color: #333;

		&::placeholder {
			color: #999;
		}
	}
	
	.list {
		background-color: #eee;
		padding: 10px;
	}
	
	.list-item {
		color: #999;
		font-size: 12px;
		border: 1px solid #d8d8d8;
		margin-bottom: 20px;
		background-color: #fff;
		.list-item-title {
			padding: 5px 10px;
			border-bottom: 1px solid #d8d8d8;
			.item-status {
				float: right;
				&.error {
					color: red;
				}
			}
		}
		.list-item-info {
			text-align: center;
			.info-left {
				float: left;
				width: 50%;
				padding-bottom: 10px;
			}
			.info-right {
				float: left;
				width: 50%;
				border-left: 1px solid #d8d8d8;
				box-sizing: border-box;
				padding-bottom: 10px;
			}
			.info-item {
				margin-top: 10px;
			}
			.info-item-label {
				color: #333;
			}
		}
	}
</style>
