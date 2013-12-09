// holds generic validation functions for checking user input.

pracMan.validate = {};

pracMan.validate.forceInt = function(aVal, def) {
	def = (!def) ? 0 : def;
	if( isNaN(aVal) ) {
		return def;
	}
	else {
		return parseInt(aVal);
	}
} 

pracMan.validate.repertoireDAT = function(aRepDAT, noisy) {
	if (pracMan.debug) pracMan.log("[CALL] pracMan.validate.repertoireDAT = function()");
	var passflag = true;
	var errMsg = "";

	if (pracMan.safe_name(aRepDAT.name) == "") {
		errMsg += "Invalid repertoire name";
		passflag = false;
	}

	aRepDAT.targetBPM = pracMan.validate.forceInt(aRepDAT.targetBPM, 0);

	if (noisy && !passflag) {
		alert(errMsg);
	}
	alert(passflag);
	return passflag;
}