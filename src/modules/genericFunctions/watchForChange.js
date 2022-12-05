export default function watchForChange(
		targetNode = null,
		callback = (mutationsList, observer) => { console.log(mutationsList, observer) },
		config = { attributes: true, childList: true, subtree: true },
	) {
	if (targetNode !== null) {
		if (!targetNode.classList.contains("observing")) {
			const observer = new MutationObserver(callback);
			targetNode.classList.add('observing')
			observer.observe(targetNode, config);
		}
	}
}