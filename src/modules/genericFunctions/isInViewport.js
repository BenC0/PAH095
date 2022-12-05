export function isInViewport(elem) {
	let bounding = elem.getBoundingClientRect();
	let headerHeight = document.querySelector('header').getBoundingClientRect().height
	return (
		bounding.top >= headerHeight - bounding.height &&
		bounding.left >= 0 &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

export default isInViewport