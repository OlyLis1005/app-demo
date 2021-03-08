export function getStyleString (styleObject) {
	return Object.keys(styleObject).map(propName => (propName + ':' + styleObject[propName] + ';')).join('')
}

export function isOk (res) {
	return res.code === 200
}

export function isArray (data) {
	return typeof data === 'object' && Object.prototype.toString.call(data) === '[object Array]'
}

export function isEmpty(data) {
	return data === undefined || data === null || (isArray(data) && data.length === 0)
}

export function formatTime(time) {
//   格式：yyyy-MM-dd hh:mm:ss或者yyyy-MM-ddThh:mm:ss.xxx+xxx
	if (time === undefined) return '';
	const tempTime = time.replace('T', ' ');
	let date = new Date(tempTime);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
	let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}
