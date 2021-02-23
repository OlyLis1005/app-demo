/*  详细文档: https://uniapp.dcloud.io/api/request/request
 */
// const baseUrl = 'http://192.168.0.113:8080'
const baseUrl = 'http://8.134.69.61:8083'

const toLogin = () => uni.navigateTo({
	url: '/pages/authorize/index?needBack=true'
})

function request(param) {
	const { url, ...rest } = param
	const apiUrl = baseUrl + url
	
	return new Promise((resolve, reject) => {
		const options = {
			url: apiUrl,
			...rest,
			success: res => {
				// 响应拦截
				if (res.data.code !== 200) {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}
				/* 强制登录 */
				if (res.data.code === 401) {
					uni.removeStorage({ key: 'token' })
					toLogin()
				}
				resolve(res.data)
			},
			fail: e => reject(e),
		}
		// 请求拦截
		if (url.indexOf('/admin/login') === -1) {
			// console.time()
			uni.getStorage({
				key: 'token',
				success: (res) => {
					// console.timeEnd()
					options.header = {
						'Authorization': res.data
					}
					uni.request(options)
				},
				fail: () => {
					reject(new Error('未登录，没有token'))
					toLogin()
				}
			})
		} else {
			uni.request(options)
		}
	})
}

export default request