import testConfig from "../testConfig/testConfig.js"

export default function beethoven(msg, importance = "low") {
	window.beethoven = window.beethoven || [] 
	let date = new Date
	window.beethoven.push({
		"msg": msg,
		"id": `${testConfig.id}:${window.beethoven.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString(),
		"importance": importance,
		"code_version": testConfig.code_version
	})

	let logStyles = `
		color: #fff;
		background: #00551c;
		font-weight: bold;
		font-size: 1em;
		padding: 1em;
	`
	switch (importance) {
		case "high":
			logStyles = `
				color: #fff;
				background: #ce2010;
				font-weight: bold;
				font-size: 1em;
				padding: 1em;
			`
			break;
		case "medium":
			logStyles = `
				color: #000;
				background: #fe8d00;
				font-weight: bold;
				font-size: 1em;
				padding: 1em;
			`
			break;
	}
	
	if (testConfig.qa_mode) {
		console.log(`%c${testConfig.id}: ${JSON.stringify(msg)}`, logStyles);
	}
}

