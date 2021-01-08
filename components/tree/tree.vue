<template>
	<view class="tree-container">
		<tree-node class="tree-node" v-for="node in data" :key="getKey(node)" :data="node" :indent="indent" :props="config" :level="level"></tree-node>
	</view>
</template>

<script>
	import TreeNode from './tree-node.vue'
	const defaultProps = {
		key: 'key',
		label: 'label',
		children: 'children'
	}
	export default {
		name: 'Tree',
		components: {TreeNode},
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			},
			props: {
				type: Object,
				default () {
					return {}
				}
			},
			indent: {
				type: Number,
				default: 15
			},
			level: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				collapse: false,
				_props: {

				}
			}
		},
		computed: {
			config() {
				const config = this.props || {}
				Object.keys(defaultProps)
					.forEach(item => {
						if (!config[item]) {
							config[item] = defaultProps[item]
						}
					})
				return config
			}
		},
		mounted() {
			console.log(this.data)
			console.log('this.config', this.config);
		},
		methods: {
			getKey(nodeData) {
				return nodeData[this.config.key]
			},
		}
	}
</script>

<style scoped>
	.tree-container {
		position: relative;
	}
</style>
