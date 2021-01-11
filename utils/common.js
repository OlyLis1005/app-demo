export function getStyleString (styleObject) {
	const propNameList = Object.keys(styleObject)
	const styleString = propNameList.map(propName => (propName + ':' + styleObject[propName] + ';')).join('')
	// console.log('styleString', styleString)
	return styleString
}