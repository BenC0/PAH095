/* Function to set a cookie. Default expiration date is 30 days. */
export function setCookie(cname, cvalue) {
	var d = new Date();
	/* Change this value to change the expiration date. The value is an integer of days */
	var exdays = 30;
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* function to retrieve a cookie value */
export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/* Function to check a cookie exists */
export function checkCookie(cookieName = false) {
	/* If cookieName is not false and exists */
	if (!!cookieName) {
		/* Return result of getCookie not equal to an empty string */
		return getCookie(cookieName) !== "";
	}
}

/* Group functions together in `cookieHandler` object for exporting the module */
const cookieHandler = {
	"setCookie"		: setCookie,
	"getCookie"		: getCookie,
	"checkCookie"	: checkCookie
}

export default cookieHandler