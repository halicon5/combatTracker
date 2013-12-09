var debugBox = document.getElementById("debug_feedback");

var debugLog = new logger();

function updateDebugBox() {
	debugBox.innerHTML = debugLog.traceLog;
}

var Manager = {};
Manager.devStack = new Array();

var objCounter = 0;

var sCalcUserData = new sCalcPrefs("kantiaSpellCalc");

Manager.eval = function(cmd) {
	debugLog.log(cmd);
	try {
		eval(cmd);
	} 
	catch (exception) {
		debugLog.log(exception);
	}
}

//var Manager = new pracMan.pracManagerSVC(ManagerData, "pracManDisplay");



/*
if (Manager.activeChar) {
	var myDebug = JSON.stringify(Manager.activeChar.d);
	myDebug = myDebug.replace(/,/g, ",\n");
	debugBox.innerHTML = pracMan.traceLog + "\n\n" + myDebug;
}

*/