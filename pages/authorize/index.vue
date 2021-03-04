<template>
    <view class="container">
        <view class="login-header">登录</view>
        <view class="">
            <view class="input-wrapper">
                <input class="input" v-model="params.username" placeholder="请输入账号">
            </view>
            <view class="input-wrapper">
                <input class="input" type="password" v-model="params.password" placeholder="请输入密码">
            </view>
            <view class="error-message">{{ errorMessage }}</view>
            <button type="primary" @click="login">登录</button>
            <!-- <text @click="mockLogin">跳过登录</text> -->
        </view>
    </view>
</template>

<script>
    import { isEmpty } from '@/utils/common'

    export default {
        name: 'index',
        data() {
            return {
                needLogin: false,
                needBack: false,
                params: {
                    username: '',
                    password: ''
                },
                nameError: null,
                passwordError: null
            }
        },
        onLoad(options) {
            this.needBack = options.needBack === 'true'
            // this.getWechatInfo()
            uni.getStorage({
                key: 'token',
                success: () => {
                    this.redirect()
                }
            })
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
                            key: 'wechartInfo',
                            data: res.userInfo
                        })
                        this.redirect()
                    }
                })
            },
            login() {
                if (isEmpty(this.params.username)) {
                    this.errorMessage = '请输入账号'
                    return
                }
                if (isEmpty(this.params.password)) {
                    this.errorMessage = '请输入密码'
                    return
                }
                this.$request({
                    url: '/admin/login',
                    method: 'POST',
                    data: this.params
                }).then(res => {
                    if (res.code !== 200) return
                    const {token, tokenHead} = res.data
                    uni.setStorage({
                        key: 'token',
                        data: tokenHead + token
                    })
                    this.redirect()
                })
            },
            mockLogin() {
                uni.setStorage({
                    key: 'token',
                    data: '666666'
                })
                this.redirect()
            },
            redirect() {
                try {
                    console.log('返回')
                    uni.navigateBack({
                        delta: 1
                    })
                } catch (e) {
                    console.log('返回失败，重定向到首页')
                    uni.switchTab({
                        url: '/pages/home/index'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 50px 20px;
    }

    .error-message {
        color: $uni-color-error;
    }

    .login-header {
        font-size: 30px;
        text-align: center;
        margin-bottom: 30px;
    }

    .input-wrapper {
        margin-bottom: 10px;

        .input {
            border: 1px solid #d8d8d8;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            border-radius: 4px;
        }
    }

</style>