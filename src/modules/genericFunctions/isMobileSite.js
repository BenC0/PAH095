import cookieHandler from "./cookieFunctions.js"

export default function isMobileSite() {
	return cookieHandler.getCookie('WC_MOBILEDEVICEID').toString() === "1"
}