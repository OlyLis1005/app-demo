<template>
	<view class="page-container">
		<uni-nav-bar left-icon="back" right-icon="loop" :title="detail.deviceId | deviceName" @clickLeft="back" @clickRight="reload"></uni-nav-bar>
		<view class="detail-content panel">
			<view class="detail-header">
				<text class="detail-title">终端报告概览</text>
				<text class="detail-status" :class="{'error': true}">异常</text>
			</view>
			<view class="detail-info">
				<view class="info-row clearfix">
					<view class="detail-info-item">台区售电量: <text class="info-value">{{ detail.energySale }}</text></view>
					<view class="detail-info-item">台区供电量: <text class="info-value">{{ detail.energySupply }}</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">台区线损电量: <text class="info-value">{{ detail.energyLost }}</text></view>
					<view class="detail-info-item">台区线损值: <text class="info-value">{{ detail.lineLost }}%</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">停电事件: <text class="info-value">{{ detail.eventPowerLost }}</text></view>
					<view class="detail-info-item">台区三相不平衡: <text class="info-value">{{ detail.eventLoadBalance }}</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">线损事件: <text class="info-value">{{ detail.eventLineLost }}</text></view>
					<view class="detail-info-item">负荷超限事件: <text class="info-value">{{ detail.eventOverLoad }}</text></view>
				</view>
				<view class="info-row clearfix">
					<view class="detail-info-item">供电质量事件: <text class="info-value">{{ detail.eventQuality }}</text></view>
					<view class="detail-info-item">电表事件: <text class="info-value">{{ detail.eventMeter }}</text></view>
				</view>
			</view>
		</view>
		<view class="panel" style="margin-bottom: 0">
			<view class="detail-header">
				<text class="detail-title">终端拓扑</text>
			</view>
			<view class="cascader-wrapper">
				<cascader :options="treeData" :value="selectedValue" @change="handleChange" :is-show-nav="false">
					<template v-slot="{ data }">
						<view>
							{{ data.label }}
							<!-- v-if="data.eventHappen" -->
							<uni-icons v-if="data.eventHappen" class="show-dialog-icon" type="info" @click.stop.native="showDialog(data)"></uni-icons>
						</view>
					</template>
				</cascader>
			</view>
		</view>
		<DDialog :visible="dialogVisible" @cancel="onCancel" title="事件总览" cancel-text="关闭" :confirm-text="null">
			<view class="event-list" v-for="item in dialogEvents">
        <view class="event-item">
          <view class="event-info"><text class="event-info-label">设备地址:</text> {{ item.address }}</view>
          <view class="event-info"><text class="event-info-label">时间发生时间:</text> {{ item.start | formatTime }}</view>
          <view class="event-info"><text class="event-info-label">事件原因:</text> {{ item.cause }}</view>
          <view class="event-info"><text class="event-info-label">处理建议:</text> {{ item.suggestion }}</view>
        </view>
      </view>
		</DDialog>
	</view>
</template>

<script>
	import Cascader from '@/components/cascader/cascader.vue'
	import DDialog from '@/components/d-dialog/d-dialog.vue'
  import request from "@/utils/request";
  import {formatTime, isEmpty} from "@/utils/common";

	const formatTreeData = treeData => {
		treeData.forEach(item => {
			if (item.eventHappen) {
				console.log('有一个eventHappen', item)
			}
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
				detail: {},
				treeData: [],
				selectedValue: [],
				dialogVisible: false,
        dialogData: {}
			}
		},
    computed: {
		  dialogEvents() {
		    return this.dialogData.eventMeter ? this.dialogData.eventMeter : []
      }
    },
    filters: {
		  deviceName(id) {
		    return `终端设备${id}`
      },
      formatTime: formatTime
    },
		onLoad(options) {
			console.log('onLoad', options);
			this.id = options.id
			this.reportId = options.reportId
			// this.getData(this.id)
		},
		onShow() {
			this.getData(this.id, this.reportId)
		},
		methods: {
			getData(terminalId, reportId, reloadCallBack) {
			  const params = { terminalId }
			  if (!isEmpty(this.reportId)) params.reportId = reportId
				this.$request({
					url: `/iot/terminal/topology`,
					method: 'POST',
          params
				}).then(res => {
					if (!this.$isOk(res)) return
					console.log('res', res.data)
          const { deviceList, mpTerminalListView } = res.data
          this.detail = mpTerminalListView
					formatTreeData(deviceList)
					console.log('treeData', deviceList)
					this.treeData = deviceList
          reloadCallBack && reloadCallBack()
				})
			},
      reload() {
			  this.getData(this.id, this.reportId, () => {
          uni.showToast({
            title: '已更新',
            icon: 'none'
          })
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
			showDialog(data) {
				console.log('showDialog', data)
        this.dialogData = data
        this.dialogVisible = true
			},
			onCancel() {
				console.log('onCancel')
				this.dialogVisible = false
				this.dialogData = {}
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

	.show-dialog-icon {
		margin-left: 10px;
	}

  .event-list {
    .event-item {
      padding: 10px;
      border-bottom: 1px solid #d8d8d8;
      .event-info {
        .event-info-label {
          font-weight: bold;
          margin-right: 8px;
        }
      }
    }
  }
</style>
