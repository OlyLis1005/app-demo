<template>
    <view class="container">
        <view class="flex-content">
            <input placeholder="请输入您的手机号">
            <ubutton type="primary" @click="register">登录</ubutton>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                needLogin: false,
                needBack: false,
            }
        },
        onLoad(options) {
            const needBack = options.needBack === 'true'
            this.needBack = needBack
            this.getWechatInfo()
        },
        methods: {
            getWechatInfo() {
                uni.authorize({
                    scope: 'scope.userInfo',
                    success: () => {
                        console.log('getWechatInfo success')
                        this.getUserInfo()
                    },
                    fail(e) {
                        console.log('getWechatInfo fail', e)
                    }
                })
            },
            getUserInfo() {
                uni.getUserInfo({
                    success: (res) => {
                        console.log('getUserInfo res', res)
                        uni.setStorage({
                            key: 'userInfo',
                            data: res.userInfo
                        })
                        if (this.needBack) {
                            console.log('back')
                            uni.navigateBack({
                                delta: 1
                            })
                        } else {
                            console.log('navigateTo home')
                            uni.switchTab({
                                url: '/pages/home/index'
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>