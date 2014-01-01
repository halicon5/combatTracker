/*
var Manager = {};
Manager.devStack = new Array();

var objCounter = 0;
*/
//var sCalcUserData = new sCalcPrefs("kantiaSpellCalc");
/*
Manager.eval = function(cmd) {
	debugLog.log(cmd);
	try {
		eval(cmd);
	} 
	catch (exception) {
		debugLog.log(exception);
	}
}
*/

cTrackerDat = new cTrack.comManDAT("v0.1");
cTracker = new cTrack.comManSVC(cTrackerDat,"combatTrackerDisplay");

var debugDispBox = document.getElementById("debug_feedback");
var debugRefresh = 1000;

cTrack.logger = new logger(debugDispBox,debugRefresh);


/*
if (Manager.activeChar) {
	var myDebug = JSON.stringify(Manager.activeChar.d);
	myDebug = myDebug.replace(/,/g, ",\n");
	debugBox.innerHTML = pracMan.traceLog + "\n\n" + myDebug;
}

*/