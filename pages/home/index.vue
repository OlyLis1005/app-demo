<template>
	<view class="page-container">
		<view class="navbar">
			<view class="city-select">
				<image class="list-icon" src="../../static/pages/home/list.svg"></image>
				广州
			</view>
			<view class="search-bar-wrapper">
				<input v-model="listQuery.keyword" class="search-bar" placeholder="快速搜索台区智能终端" :radius="36" @confirm="handleConfirm" />
			</view>
		</view>
		<view class="list">
			<view class="list-item" v-for="item in list" :key="item.id" @click="toDetail(item.id, item.reportId)">
				<view class="list-item-title">
					<text>终端{{item.address}}</text>
					<text class="item-status" :class="{ 'error': item.eventHappen }">{{item.eventHappen | statusFilter}}</text>
				</view>
				<view class="list-item-info clearfix">
					<view class="info-left">
						<view class="info-item">
							<text class="info-item-label">台区售电量：</text>
							<text>{{ item.energySale }}</text>
						</view>
						<view class="info-item">
							<text class="info-item-label">台区供电量：</text>
							<text>{{ item.energySupply }}</text>
						</view>
					</view>
					<view class="info-right">
						<view class="info-item">
							<text class="info-item-label">台区线损电量：</text>
							<text>{{ item.energyLost }}</text>
						</view>
						<view class="info-item">
							<text class="info-item-label">台区线损值：</text>
							<text>{{ item.lineLost }}%</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus" @clickLoadMore="loadMore"></uni-load-more>
		</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
  import {isEmpty} from "@/utils/common";

	export default {
		components: {uniIcons},
		data() {
			return {
				loadStatus: 'more',
				listQuery: {
					keyword: '',
					pageNum: 1,
					pageSize: 5
				},
				list: []
			}
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			console.log('onReachBottom')
			this.loadMore()
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			this.listQuery.pageNum = 1
			this.list = []
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				this.loadStatus = 'loading'
				this.$request({
					url: '/iot/terminal/list',
					method: 'POST',
					params: this.listQuery,
				}).then(res => {
					this.loadStatus = 'more'
					uni.stopPullDownRefresh()
					if (res.code !== 200) return
					const { list, total, totalPage } = res.data
					console.log('list', list)
					this.list = loadMore ? [...this.list, ...list] : list
					if (this.listQuery.pageNum >= totalPage) {
						this.loadStatus = 'noMore'
					} else {
						this.loadStatus = 'more'
					}
				})
			},
			loadMore() {
				if (this.loadStatus === 'noMore') return
				this.listQuery.pageNum++
				this.getList(true)
			},
			handleConfirm() {
				console.log('searchValue', this.listQuery.query)
				this.getList()
			},
			toDetail(id, reportId) {
				console.log('toDetail');
				const url = `/pages/home/detail/index?id=${id}` + (isEmpty(reportId) ? '' : `&reportId=${reportId}`)
				uni.navigateTo({
					url,
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
					case true:
					return '异常'
					case false:
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
		/*background-color: #eee;*/
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
