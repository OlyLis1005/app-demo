/*  详细文档: https://uniapp.dcloud.io/api/request/request
 */
const baseUrl = 'http://192.168.0.113:8080'

function request(param) {
	const { url, ...rest } = param
	const apiUrl = baseUrl + url
	// return uni.request({
	// 	url: apiUrl,
	// 	...rest
	// })
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl,
			...rest,
			success: res => resolve(res.data),
			fail: e => reject(e),
		})
	})
}

export default request