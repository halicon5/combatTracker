cTrack.tickDAT = function(aTick) {
	if (!aTick) {
		aTick = {};
	}

	this.tickId = (isNaN(aTick.tickId)) ? 0 : parseInt(aTick.tickId,10);
	this.act = (!aTick.act) ? "" : aTick.act;
	this.actionStatus = (!aTick.actionStatus) ? "Declare" : aTick.actionStatus;
	this.declaredAction = (!aTick.declaredAction) ? "" : aTick.declaredAction;
	this.declaredTickId = (isNaN(aTick.declaredTickId)) ? -99 : parseInt(aTick.declaredTickId,10);
	this.plannedDuration = (isNaN(aTick.plannedDuration)) ? 1 : parseInt(aTick.plannedDuration,10);
//	this.actualDuration = 0;

	this.resolved = (!aTick.resolved) ? "U" : aTick.resolved;
}