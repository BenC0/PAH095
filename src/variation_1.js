import testConfig from "./modules/testConfig/testConfig.js"
import variationCSS from "./modules/testConfig/variation-1.css";

import addStylesToDOM from "./modules/genericFunctions/addStylesToDOM.js"
import watchForChange from "./modules/genericFunctions/watchForChange.js"
import isMobileSite from "./modules/genericFunctions/isMobileSite.js"
import pollFunction from "./modules/genericFunctions/pollFunction.js"
import gaSendEvent from "./modules/genericFunctions/gaSendEvent.js"
import peabody from "./modules/genericFunctions/peabody.js"

testConfig["variant"] = "Variation 1"
const bodyClass = `${testConfig.id}_loaded`.replace(/ /g, '-').toLowerCase()
const isMobile = isMobileSite()
peabody.registerTest(testConfig["variant"])

function findAccordionHeader(category) {
	let spans = [...document.querySelectorAll('[data-module="mega_menu"] header span')]
	spans = spans.filter(e => e.textContent.trim().toLowerCase() === category.toLowerCase())
	return spans[0].parentNode
}

function getAccordion(category) {
	let header = findAccordionHeader(category)
	let content = header.nextElementSibling
	let parent = header.parentNode
	let id = [...parent.classList].filter(a => a.match(/^mega-menu-level[0-9]*/gi))[0] || ""
	console.log(parent.classList)
	let lvl = [...parent.classList].filter(a => a.match(/^-js-accordion-level[0-9]*/gi))[0].replace(/[a-z]|-/gi,"")
	return {
		id,
		lvl,
		parent,
		header,
		content,
		category: category.replace(/ /g, "-"),
	}
}

function sanitiseAccordion(accordion) {
	peabody.log({"message": "sanitiseAccordion Running", accordion})
	accordion.parent.classList.add(`mega-menu`)
	accordion.parent.classList.add(`mega-menu-${accordion.category}`)
	accordion.parent.classList.add(`${accordion.id}-${accordion.category}`)
	accordion.parent.classList.remove(accordion.id)
	accordion.parent.classList.remove(`-js-accordion-level${accordion.lvl}`)

	accordion.header.querySelector('span').setAttribute('class', `mega-menu__header-label`)

	accordion.header.classList.add(`mega-menu__header`)
	accordion.header.classList.add(`${accordion.id}-${accordion.category}__header`)
	accordion.header.classList.remove(`first`)
	accordion.header.classList.remove(`active`)
	accordion.header.classList.remove(`${accordion.id}__header`)
	accordion.header.classList.remove(`-js-accordion-trigger-level${accordion.lvl}`)

	accordion.content.classList.add(`mega-menu__content`)
	accordion.content.classList.add(`${accordion.id}-${accordion.category}__content`)
	accordion.content.classList.remove(`active`)
	accordion.content.classList.remove(`${accordion.id}__content`)
	accordion.content.classList.remove(`-js-accordion-content-level${accordion.lvl}`)
	peabody.log({"message": "sanitiseAccordion Complete", accordion})
}

function rebuildAccordion(category, method, target) {
	peabody.log({"message": "Rebuilding Accordion", category, method, target})
	let accordion = getAccordion(category)
	target = document.querySelector(target).parentNode
	sanitiseAccordion(accordion)
	target.insertAdjacentHTML(method, accordion.parent.outerHTML)
	accordion.parent.remove()
	buildThisAccordion(`.${accordion.id}-${accordion.category}`, `.${accordion.id}-${accordion.category}`);
	peabody.log({"message": "Accordion Rebuilt", category, method, target, accordion})
}

function rebuildSubAccordion(sub, txt) {
	peabody.log({sub, "msg": "Rebuilding SubAccordion"})
	let subID = sub.getAttribute('data-module').replace(/_/g,"-")
	let header = sub.querySelector(`.${subID}__header`)
	let content = sub.querySelector(`.${subID}__content`)
	subID = subID.replace(/[0-9]/g,"1")
	sub.setAttribute('class', `${subID}-${txt} ${subID}`)
	header.setAttribute('class', `${subID}-${txt}__header ${subID}__header`)
	content.setAttribute('class', `${subID}-${txt}__content ${subID}__content`)
	buildThisAccordion(`.${subID}-${txt}`, `.${subID}-${txt}`);
}

function init() {
	peabody.log('Init Function Called')
	if (!document.body.classList.contains(bodyClass)) {
		document.body.classList.add(bodyClass);
		peabody.log(`${bodyClass} Class Added`)
		gaSendEvent(testConfig["variant"], 'Loaded', true)
		addStylesToDOM(variationCSS)

		rebuildAccordion("puppy", "afterEnd", "nav > section > header.dog")
		rebuildAccordion("kitten", "afterEnd", "nav > section > header.cat")

		let subAccords = document.querySelectorAll('.mega-menu-puppy .mega-menu__content header, .mega-menu-kitten .mega-menu__content header')
		peabody.log({"message": "Subaccordion Headers Found", subAccords})
		subAccords.forEach(s => rebuildSubAccordion(s.parentNode, s.textContent.toLowerCase().trim().replace(/ /g, '_')))

		document.querySelector('.mega-menu-level1-puppy__header').addEventListener('click', e => {
			gaSendEvent(testConfig["variant"], 'Puppy Accordion Clicked')
		})

		document.querySelector('.mega-menu-level1-kitten__header').addEventListener('click', e => {
			gaSendEvent(testConfig["variant"], 'Kitten Accordion Clicked')
		})
	}
}

function pollConditions() {
	let conditions = []
	conditions.push(isMobile)
	conditions.push(document.querySelector('nav > section > header.dog') !== null)
	conditions.push(document.querySelector('nav > section > header.cat') !== null)
	conditions.push(document.querySelector('nav > section section[class*="-js-accordion-level"]') !== null)
	peabody.log({message: `Polling: Conditions`, conditions})
	let result = conditions.every(a => a)
	peabody.log({message: `Polling: Result`, result})
	return result
}

peabody.log(`${testConfig["variant"]} Code Loaded`)
pollFunction(pollConditions, init, 10, 50)