import testConfig from "../testConfig/testConfig.js"

export function isPDP() {
	return !!window.pageType && window.pageType === "PDP"
}

export function isPLP() {
	return !!window.pageType && window.pageType === "PLP"
}

export function isHome() {
	return !!window.pageType && window.pageType === "Homepage"
}

export function pageType() {
	return !!window.pageType ? window.pageType : false
}

export function log(msg) {
	let date = new Date
	window.peabody[testConfig.id].logs.push({
		"msg": msg,
		"id": `${testConfig.id}:${window.peabody[testConfig.id].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString(),
		"code_version": testConfig.code_version
	})
}

export function registerTest(variant) {
	window.peabody = window.peabody || {
		isPDP: isPDP(),
		isPLP: isPLP(),
		isHome: isHome(),
		pageType: pageType(),
	}
	window.peabody[testConfig.id] =  {
		logs: [],
		variant,
		testConfig,
	}
}

const peabody = {
	log: log,
	registerTest: registerTest,
}

export default peabody