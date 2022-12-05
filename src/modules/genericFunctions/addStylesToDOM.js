/* Function to add styles to the DOM. Accepts a string containing the CSS rules. (No style tags needed in the string) */
export default function addStylesToDOM(css) {
	let head = document.head || document.getElementsByTagName('head')[0]
	let style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet){
	  // This is required for IE8 and below.
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}
}