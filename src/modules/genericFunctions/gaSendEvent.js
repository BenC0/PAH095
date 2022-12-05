import testConfig from "../testConfig/testConfig.js"
import beethoven from "./beethoven.js"

/* Function to send events to GA. Accepts eventAction and eventLabel as strings and impressionEvent as a boolean (true/false) */
export default function gaSendEvent(variant = "", eventAction = "", impressionEvent = false) {
	if (variant !== "" && eventAction !== "") {
		window.dataLayer = window.dataLayer || []
		let eventObject = {
			'event': 'CRO_Test_Event',
			'eventAction': `${eventAction}`,
			'eventLabel': `${testConfig.id}-${variant}`,
		}

		if (impressionEvent !== false && testConfig.customDimension !== "") {
			eventObject = {
				'event': 'CRO_Test_Impression',
				'testID': testConfig.id,
				'dimension': testConfig.customDimension,
				'variation': variant,
			}
		}

		window.dataLayer.push(eventObject)
		
		let beethovenImportance = !testConfig.qa_mode ? "low": "high"
		beethoven(eventObject, beethovenImportance);
	}
}