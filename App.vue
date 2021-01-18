<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.container {
		color: #333;
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.page-container {
		background-color: #eee;
		color: #333;
		font-size: 14px;
		
		.panel {
			background-color: #fff;
			margin-bottom: 10px;
		}
	}
	
	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.flex-container {
		display: flex;
		&.vertical {
			flex-direction: column;
		}
		.flex-content {
			flex: auto;
		}
	}
	
	.pull-left {
		float: left;
	}
	
	.pull-right {
		float: right;
	}
</style>
