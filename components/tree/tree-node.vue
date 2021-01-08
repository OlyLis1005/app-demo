<template>
	<view class="tree-node" :style="getIndetStyle">
		<!-- <view class="vertical-line" :style="getVerticalLintStyle"></view> -->
		<!-- <view class="row-line" :style="getRowLintStyle"></view> -->
		<!-- <view v-if="!collapse && (level > 0)" class="collapse-left-line" :style="getCollapseLeftLine"></view> -->
		<view class="tree-node-item" :style="getItemStyle" @click="handleCollapse">
			<text :class="getCollapseClass" v-if="hasChildren">></text>
			<text>{{ getLabel }}</text>
		</view>
		<view v-if="!collapse">
			<tree v-if="hasChildren" :data="getChildren" :props="this.config" :indent="indent" :level="level + 1"></tree>
		</view>
	</view>
</template>

<script>
	import { getStyleString } from '../../utils/common.js'
	const defaultProps = {
		key: 'key',
		label: 'label',
		children: 'children'
	}
	export default {
		name: 'TreeNode',
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			props: {
				type: Object,
				default()  {
					return {}
				}
			},
			level: {
				type: Number
			},
			indent: {
				type: Number,
				default: 15
			},
			itemHeght: {
				type: Number,
				default: 30
			}
		},
		data () {
			return {
				collapse: false
			}
		},
		computed: {
			getIndetStyle () {
				return getStyleString({
					'padding-left':this.indent + 'px',
				})
				return [
					'padding-left:' + this.indent + 'px',
				].join(';')
			},
			getItemStyle () {
				return getStyleString({
					'height':this.itemHeght + 'px',
					'line-height': this.itemHeght + 'px',
				})
			},
			getVerticalLintStyle () {
				return getStyleString({
					'height': this.itemHeght + 'px;',
					'top': -1 * (this.itemHeght / 2) + 'px'
				})
			},
			getRowLintStyle () {
				return getStyleString({
					'width': this.indent + 15 + 'px;',
					'top': this.itemHeght / 2 + 'px'
				})
			},
			getCollapseLeftLine () {
				const itemConut = this.getChildren ? this.getChildren.length : 0
				return getStyleString({
					'height': this.itemHeght * itemConut + 'px;',
					'top': this.itemHeght / 2 + 'px;'
				})
			},
			getCollapseClass () {
				return 'collapse-icon ' + (this.collapse ? 'closed' : 'open')
			},
			config() {
				const config = this.props || {}
				Object.keys(defaultProps)
					.forEach(item => {
						if (!config[item]) {
							config[item] = defaultProps[item]
						}
					})
				return config
			},
			getKey () {
				return this.data[this.config.key]
			},
			getLabel () {
				return this.data[this.config.label]
			},
			getChildren () {
				return this.data[this.config.children]
			},
			hasChildren () {
				const children = this.getChildren
				return children && children.length > 0
			},
		},
		mounted () {
			console.log('nodeData', this.data)
			console.log('node config', this.config)
		},
		methods: {
			handleCollapse () {
				if (this.hasChildren) {
					this.collapse = !this.collapse
				}
			}
		}
	}
</script>

<style scoped>
	.tree-node {
		position: relative;
	}
	.tree-node-item {
		position: relative;
		padding-left: 20px;
		border-bottom: 1px solid #d8d8d8;
	}
	
	.vertical-line {
		position: absolute;
		left: 0;
		width: 1px;
		background-color: #d8d8d8;
	}
	
	.collapse-left-line {
		position: absolute;
		left: 0;
		width: 1px;
		/* background-color: #d8d8d8; */
		background-color: red;
	}
	
	.row-line {
		position: absolute;
		left: 0;
		height: 1px;
		width: 20px;
		background-color: #d8d8d8;
	}
	
	.collapse-icon {
		position: absolute;
		top: 0;
		right: 0;
		transition: all .3s linear;
	}
	
	.collapse-icon.open {
		transform: rotateZ(90deg);
	}
</style>
