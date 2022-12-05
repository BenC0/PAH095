export function calcScrollDepth() {
	let documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
	let currentScroll = window.pageYOffset + windowHeight
	let scrollPercent = parseInt((currentScroll/documentHeight) * 100)
	return scrollPercent
}

export default calcScrollDepth