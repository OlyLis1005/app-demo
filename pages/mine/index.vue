<template>
	<view class="page-container">
		<view class="user-info">
			<view class="avatar">
				<image v-if="hasLogin" :src="avatarUrl" mode="scaleToFill" style="height: 100%;width: 100%;"></image>
			</view>
			<view class="user-info-detail">
				<view v-if="hasLogin">
					<view class="user-name">
						<text>{{ nickName }} | {{ department }}</text>
					</view>
					<view class="user-email">
						<text>{{ email }}</text>
					</view>
				</view>
				<view v-else>
					<view class="click-to-login" @click="toLogin">点击登录</view>
				</view>
			</view>
		</view>
		<view v-if="hasLogin">
			<view class="list-header">安全</view>
			<view class="list-container">
				<uni-list>
					<uni-list-item title="密码设置" link to="/pages/index/detail/index"></uni-list-item>
					<uni-list-item title="已实名认证" link></uni-list-item>
					<uni-list-item title="修改绑定手机号" link rightText="186****6981"></uni-list-item>
				</uni-list>
			</view>
			<view class="list-header">通用</view>
			<view class="list-container">
				<uni-list>
					<uni-list-item title="接收通知" :show-switch="true" @switchChange="switchChange" :switchChecked="switchChecked"></uni-list-item>
					<uni-list-item title="常用功能设置" link></uni-list-item>
					<uni-list-item title="图片质量设置" link rightText="高清"></uni-list-item>
					<uni-list-item title="隐私设置" link></uni-list-item>
					<!--				<uni-list-item title="清理缓存(0.80M)" link></uni-list-item>-->
					<uni-list-item title="关于" link></uni-list-item>
				</uni-list>
			</view>
			<view class="logout-wrapper">
				<button type="warn" @click="logout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasLogin: false,
				avatarUrl: 'https://img.xiaopiu.com/userImages/img21159694648f8.jpg',
				nickName: '罗小明',
				department: '兰州运营中心-风控部',
				email: 'sing173@126.com',
				switchChecked: false
			}
		},
		computed: {
		},
		onShow () {
			this.getUserInfoFromStorage()
		},
		methods: {
			getUserInfoFromStorage() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						const userInfo = res.data
						const { username, roles, icon } = userInfo
						this.nickName = username
						this.department = roles ? roles[0] : ''
						this.avatarUrl = icon
						this.hasLogin = true
					},
					fail: this.getUserInfo
				})
			},
			getUserInfo() {
				this.$request({
					url: '/admin/info',
					method: 'GET'
				}).then(res => {
					if (res.code !== 200) return
					const userInfo = res.data
					uni.setStorage({
						key: 'userInfo',
						data: userInfo,
						success: this.getUserInfoFromStorage
					})
				})
			},
			getWechartInfo() {
				uni.getStorage({
					key: 'wechartInfo',
					success: res => {
						const userInfo = res.data
						this.nickName = userInfo.nickName
						this.avatarUrl = userInfo.avatarUrl
						this.hasLogin = true
					},
					fail: () => {
					}
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/authorize/index'
				})
			},
			switchChange (value) {
				this.switchChecked = value
			},
			logout() {
				this.hasLogin = false
				this.nickName = ''
				this.department = ''
				uni.removeStorage({key: 'userInfo'})
				uni.removeStorage({key: 'token'})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.user-info {
		background-color: $uni-color-primary;
		padding: 10px;
		display: flex;
		color: #fff;

		.avatar {
			width: 50px;
			height: 50px;
			border: 1px solid #fff;
		}
		.user-info-detail {
			flex: auto;
			padding-left: 10px;
		}

		.user-name {
			margin-bottom: 8px;
		}

		.user-email, .click-to-login {
			font-size: 12px;
			display: inline-block;
			border: 1px solid #fff;
			height: 20px;
			line-height: 20px;
			border-radius: 20px;
			padding: 0 10px;
		}
	}

	.list-header {
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		font-size: 12px;
		color: #999;
	}
	.list-container {
		padding: 0 10px;
	}
	.swiper-item {
		text-align: center;
	}
	.logout-wrapper {
		padding: 10px;
	}
</style>
