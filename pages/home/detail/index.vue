<template>
	<view class="page-container">
		<uni-nav-bar left-icon="back" right-icon="loop" :title="detail.name" @clickLeft="back"></uni-nav-bar>
		<view class="detail-content panel">
			<view class="detail-header">
				<text class="detail-title">终端报告概览</text>
				<text class="detail-status" :class="{'error': true}">异常</text>
			</view>
			<view class="detail-info">
				<view class="info-row clearfix">
					<view class="detail-info-item">台区售电量: <text class="info-value">10010</text></view>
					<view class="detail-info-item">台区供电量: <text class="info-value">10010</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">台区线损电量: <text class="info-value">10010</text></view>
					<view class="detail-info-item">台区线损值: <text class="info-value">10010</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">停电事件: <text class="info-value">10010</text></view>
					<view class="detail-info-item">台区三相不平衡: <text class="info-value">10010</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">线损事件: <text class="info-value">10010</text></view>
					<view class="detail-info-item">负荷超限事件: <text class="info-value">10010</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">供电质量事件: <text class="info-value">10010</text></view>
					<view class="detail-info-item">电表事件: <text class="info-value">10010</text></view>
				</view>
			</view>
		</view>
		<view class="panel">
			<view class="detail-header">
				<text class="detail-title">终端拓扑</text>
			</view>
			<view class="cascader-wrapper">
				<cascader :options="treeData" :value="selectedValue" @change="handleChange" :is-show-nav="false"></cascader>
			</view>
		</view>
	</view>
</template>

<script>
	import Cascader from '@/components/cascader/cascader.vue'
	import DDialog from '@/components/d-dialog/d-dialog.vue'

	const formatTreeData = treeData => {
		treeData.forEach(item => {
			item.label = item.shortcut || item.address
			item.value = item.id
			if (item.children) formatTreeData(item.children)
		})
	}

	export default {
		components: {
			Cascader,
			DDialog
		},
		data() {
			return {
				detail: {
					name: '终端设备000000001',
				},
				treeData: [
					// {
					// 	value: 1,
					// 	label: '一级 1',
					// 	children: [{
					// 		value: 11,
					// 		label: '二级 1-1',
					// 		children: [{
					// 			value: 111,
					// 			label: '三级 1-1-1'
					// 		}]
					// 	}],
					// }, {
					// 	value: 2,
					// 	label: '一级 2',
					// 	children: [{
					// 		value: 21,
					// 		label: '二级 2-1',
					// 		children: [{
					// 			value: 211,
					// 			label: '三级 2-1-1'
					// 		}]
					// 	}, {
					// 		value: 22,
					// 		label: '二级 2-2',
					// 		children: [{
					// 			value: 221,
					// 			label: '三级 2-2-1'
					// 		}]
					// 	}]
					// }, {
					// 	value: 3,
					// 	label: '一级 3',
					// 	children: [{
					// 		value: 31,
					// 		label: '二级 3-1',
					// 		children: [{
					// 			value: 311,
					// 			label: '三级 3-1-1'
					// 		}]
					// 	}, {
					// 		value: 32,
					// 		label: '二级 3-2',
					// 		children: [{
					// 			value: 321,
					// 			label: '三级 3-2-1'
					// 		}]
					// 	}]
					// }
				],
				selectedValue: []
			}
		},
		onLoad(options) {
			console.log('onLoad', options);
			this.id = options.id
			// this.getData(this.id)
		},
		onShow() {
			this.getData(this.id)
		},
		methods: {
			getData(id) {
				this.$request({
					url: `/iot/terminal/topology?terminalId=${id}`,
					method: 'POST'
				}).then(res => {
					if (!this.$isOk(res)) return
					console.log('res', res.data)
					const treeData = res.data
					formatTreeData(treeData)
					console.log('treeData', treeData)
					this.treeData = treeData
				})
			},
			back() {
				console.log('back');
				uni.navigateBack({
				    delta: 1
				})
			},
			handleChange(selectedValue, clickItem) {
				console.log('handleChange', selectedValue)
				console.log(clickItem)
				this.selectedValue = selectedValue
			},
			onConfirm(selectedValue) {
				console.log('onConfirm', this.selectedValue)
			},
			onCancel() {
				console.log('onCancel')
			},
		},
	}
</script>

<style lang="scss" scoped>
	.detail-header {
		padding: 5px 10px;
		border-bottom: 1px solid #d8d8d8;
	}
	
	.detail-content {
		margin-top: 10px;
	}
	.detail-title {
		font-weight: bold;
	}
	
	.detail-info {
		padding: 0 10px;
		
		.info-row {
			padding: 10px 0;
			
			&:not(:last-child) {
				border-bottom: 1px solid #d8d8d8;
			}
		}
		
		.detail-info-item {
			font-size: 12px;
			position: relative;
			text-align: center;
			padding: 5px 0;
			float: left;
			width: 50%;
			box-sizing: border-box;
			
			&:nth-child(2n) {
				border-left: 1px solid #d8d8d8;
			}
			
			.info-value {
				margin-left: 10px;
				color: #999;
			}
		}
	}

	.detail-status {
		float: right;

		&.error {
			color: red;
		}
	}

	.cascader-wrapper {
		height: 300px;
	}
</style>
