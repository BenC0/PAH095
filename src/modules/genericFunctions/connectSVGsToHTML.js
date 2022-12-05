import beethoven from "./beethoven.js"
export function connectSVGsToHTML(htmlStr, svgs) {
	beethoven("connectSVGsToHTML")
	let matches = htmlStr.match(/<SVG:[a-z]*(| )\/>/g)
	beethoven(matches)
	matches.forEach(match => {
		let sanitisedMatch = match.replace(/<SVG:|\/>/g, '').trim()
		let icon = svgs[sanitisedMatch]
		htmlStr = htmlStr.replace(match, icon)
	})
	return htmlStr
}

export default connectSVGsToHTML