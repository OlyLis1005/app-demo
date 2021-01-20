export function getStyleString (styleObject) {
	return Object.keys(styleObject).map(propName => (propName + ':' + styleObject[propName] + ';')).join('')
}

export function isOk (res) {
	return res.code === 200
}

export function isEmpty(data) {
	return data === undefined || data === null || (typeof data === 'object' && Object.prototype.toString.call(data) === '[object Array]' && data.length === 0)
}