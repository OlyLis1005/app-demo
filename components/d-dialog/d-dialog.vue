<template>
	<view class="dialog" v-if="visible">
		<view class="dialog-mask" @click="onClickCancel()"></view>
		<view class="dialog-container" :style="containerStyle">
			<view class="dialog-header clearfix">
				<view class="dialog-title">{{title}}</view>
				<text v-if="confirmText" class="dialog-btn pull-right confirm-btn" @click="onClickConfirm()">{{ confirmText }}</text>
				<text v-if="cancelText" class="dialog-btn pull-left" @click="onClickCancel()">{{ cancelText }}</text>
			</view>
			<view class="dialog-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {getStyleString} from '@/utils/common.js'
	export default {
		name: 'd-dialog',
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '对话框'
			},
			height: {
				type: Number,
				default: 400
			},
			onConfirm: {
				type: Function,
				default: null
			},
			onCancel: {
				type: Function,
				default: null
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确认'
			},
		},
		data() {
			this.dialogHeight = Math.min(wx.getSystemInfoSync().windowHeight, this.height)
			console.log(this.dialogHeight);
			return {}
		},
		computed: {
			containerStyle() {
				return getStyleString({
					height: this.dialogHeight + 'px'
				})
			},
		},
		methods: {
			onClickConfirm() {
				console.log('onClickConfirm');
				this.$emit('confirm', this.selectedValue)
				// this.onConfirm(this.selectedValue)
			},
			onClickCancel() {
				console.log('onClickCancel');
				this.$emit('cancel')
				// this.onCancel()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		.dialog-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			background: rgba(0, 0, 0, 0.4);
		}
		.dialog-container {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 11;
			background: #fff;
		}
		.dialog-header {
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			color: #999;
			padding: 5px 10px;
			border-bottom: 1px solid #d8d8d8;
			text-align: center;
			.dialog-title {
				display: inline-block;
			}
			.dialog-btn {
				font-size: 14px;
			}
			.confirm-btn {
				color: #0083FF;
				margin-left: 10px;
			}
		}
		.dialog-content {
			height: calc(100% - 30px)
		}
	}
</style>
