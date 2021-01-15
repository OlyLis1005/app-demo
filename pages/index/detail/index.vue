<template>
	<view class="container">
		<view>
			selectedValue:
			<text v-for="item in selectedValue" :key="item">{{item}},</text>
		</view>
		<button type="default" @click="dialogVisible = true">显示树</button>
		<d-dialog :visible="dialogVisible" @confirm="onConfirm" @cancel="onCancel">
			<cascader style="height: 100%;" :options="treeData" :value="selectedValue" @change="handleChange"></cascader>
		</d-dialog>
	</view>
</template>

<script>
	import Cascader from '@/components/cascader/cascader.vue'
	import DDialog from '@/components/d-dialog/d-dialog.vue'
	
	export default {
		components: {Cascader,DDialog},
		data() {
			return {
				dialogVisible: true,
				treeData: [{
					value: 1,
					label: '一级 1',
					children: [{
						value: 11,
						label: '二级 1-1',
						children: [{
							value: 111,
							label: '三级 1-1-1'
						}]
					}],
					}, {
					value: 2,
					label: '一级 2',
					children: [{
						value: 21,
						label: '二级 2-1',
						children: [{
							value: 211,
							label: '三级 2-1-1'
						}]
					}, {
						value: 22,
						label: '二级 2-2',
						children: [{
							value: 221,
							label: '三级 2-2-1'
						}]
					}]
				}, {
					value: 3,
					label: '一级 3',
					children: [{
						value: 31,
						label: '二级 3-1',
						children: [{
							value: 311,
							label: '三级 3-1-1'
						}]
					}, {
						value: 32,
						label: '二级 3-2',
						children: [{
							value: 321,
							label: '三级 3-2-1'
						}]
					}]
				}],
				selectedValue: [3,31,311]
			}
		},
		methods: {
			handleChange(selectedValue) {
				// console.log('handleChange', selectedValue)
				this.selectedValue = selectedValue
			},
			onConfirm(selectedValue) {
				console.log('onConfirm', this.selectedValue)
				this.dialogVisible = false
			},
			onCancel() {
				console.log('onCancel')
				this.dialogVisible = false
			},
		},
		computed: {

		}
	}
</script>

<style scoped>

</style>
