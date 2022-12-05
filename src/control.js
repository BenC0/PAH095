import testConfig from "./modules/testConfig/testConfig.js"
import variationCSS from "./modules/testConfig/variation-1.css";

import addStylesToDOM from "./modules/genericFunctions/addStylesToDOM.js"
import watchForChange from "./modules/genericFunctions/watchForChange.js"
import isMobileSite from "./modules/genericFunctions/isMobileSite.js"
import pollFunction from "./modules/genericFunctions/pollFunction.js"
import gaSendEvent from "./modules/genericFunctions/gaSendEvent.js"
import beethoven from "./modules/genericFunctions/beethoven.js"
import peabody from "./modules/genericFunctions/peabody.js"

testConfig["variant"] = "Control"
const bodyClass = `${testConfig.id}_loaded`.replace(/ /g, '-').toLowerCase()
const isMobile = isMobileSite()
peabody.registerTest(testConfig["variant"])

function init() {
	beethoven('Init Function Called')
	if (!document.body.classList.contains(bodyClass)) {
		document.body.classList.add(bodyClass);
		beethoven(`${bodyClass} Class Added`)
		gaSendEvent(testConfig["variant"], 'Loaded', true)
	}
}

function pollConditions() {
	let conditions = []
	conditions.push(isMobile)
	conditions.push(document.querySelector('nav > section.-js-accordion-menu0') !== null)
	conditions.push(document.querySelector('nav > section.-js-accordion-menu1') !== null)
	peabody.log({message: `Polling: Conditions`, conditions})
	let result = conditions.every(a => a)
	peabody.log({message: `Polling: Result`, result})
	return result
}

peabody.log(`${testConfig["variant"]} Code Loaded`)
pollFunction(pollConditions, init)