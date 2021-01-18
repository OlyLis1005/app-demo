<template>
	<view class="cascader">
		<view v-if="isShowNav" class="bread-crumb clearfix">
			<view class="bread-crumb-root">当前：</view>
			<view class="bread-crumb-item" v-for="(item, index) in breadCrumbList" :key="item.value" >
				<text class="bread-crumb-text" @click="clickNav(item, index)">{{item.label}}</text>
				<view v-if="index < breadCrumbList.length - 1" class="bread-crumb-icon">></view>
			</view>
		</view>
		<view class="cascader-content">
			<scroll-view scroll-x scroll-with-animation :scroll-left="scrollLeft" style="height:100%;">
				<view class="options-row clearfix" :style="rowStyle">
					<view class="options-column" v-for="(opitons, columnIndex) in optionsList" :key="columnIndex" :style="columnStyle">
						<scroll-view scroll-y style="height:100%">
							<view class="options-item" v-for="(item, index) in opitons" :class="{'active': selectedValue[columnIndex] == item.value}" :key="item.value" @click="clickItem(item, columnIndex)">{{item.label}}</view>
						</scroll-view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {getStyleString} from '@/utils/common.js'
	export default {
		name: 'cascader',
		props: {
			value: {
				type: Array,
				default() {return []}
			},
			options: {
				type: Array,
				default() {return []}
			},
			isShowNav: {
				type: Boolean,
				default: true
			}
		},
		data() {
			this.COLUMN_WIDTH = wx.getSystemInfoSync().windowWidth / 2
			return {
				selectedValue: [],
				optionsList: []
			}
		},
		computed: {
			breadCrumbList() {
				return this.selectedValue.map((item, i) => this.optionsList[i].find(option => option.value === item))
			},
			containerStyle() {
				return getStyleString({
					height: this.height + 'px'
				})
			},
			rowStyle() {
				return getStyleString({
					width: this.COLUMN_WIDTH * (Math.max(2, this.optionsList.length)) + 'px'
				})
			},
			columnStyle() {
				return getStyleString({
					width: this.COLUMN_WIDTH + 'px'
				})
			},
			scrollLeft() {
				return Math.max(0, this.COLUMN_WIDTH * (this.optionsList.length - 2))
			}
		},
		watch: {
			value(val) {
				this.handleValue(val)
			},
			options(val) {
				this.handleValue(this.value)
			}
		},
		created() {
			this.handleValue(this.value)
		},
		methods: {
			handleValue(val) {
				this.selectedValue = []
				this.optionsList = this.getOptionsList(val, this.options)
				this.selectedValue = val
			},
			getOptionsList(values, options, currentList = []) {
				if (!options || options.length === 0) return currentList
				currentList.push(options)
				if (values.length === 0) return currentList
				const next = options.find(item => item.value === values[0])
				const nextValue = values.slice(1)
				const nextOptions = next.children
				return this.getOptionsList(nextValue, nextOptions, currentList)
			},
			clickNav(item, index) {
				this.clickItem(item, index)
			},
			clickItem(item, columnIndex) {
				const selectedValue = this.selectedValue.slice(0, columnIndex)
				const optionsList = this.optionsList.slice(0, columnIndex + 1)
				selectedValue.splice(columnIndex, 1, item.value)
				this.selectedValue = selectedValue
				if (item.children) optionsList.splice(columnIndex + 1, 1, item.children)
				this.optionsList = optionsList
				this.$emit('change', selectedValue, item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cascader {
		height: 100%;
		
		.bread-crumb {
			height: 30px;
			line-height: 30px;
			border-bottom: 1px solid #d8d8d8;
			padding: 0 10px;
			font-size: 12px;
			
			.bread-crumb-root {
				float: left;
			}
			
			.bread-crumb-item {
				float: left;
			}
			
			.bread-crumb-text {
				color: #0083FF;
			}
			
			.bread-crumb-icon {
				display: inline-block;
				padding: 0 5px;
			}
		}
		
		.cascader-content {
			height: calc(100% - 30px);
		}
		
		.options-row {
			height: 100%;
		}
		
		.options-column {
			float: left;
			height: 100%;
			
			box-sizing: border-box;
			
			&:not(:last-child) {
				border-right: 1px solid #d8d8d8;
			}
		}
		
		.options-item {
			padding: 10px 10px;
			
			&.active {
				color: #ff6600;
			}
		}
	}
</style>
