cTrack.tickDAT = function(aTick) {
	this.tickId = (isNaN(aTick.tickId)) ? 0 : parseInt(aTick.tickId,10);
	this.act = (!aTick.act) ? "" : aTick.act;
	this.tickStatus = 0;	// 0 open 1 complete
	this.combatStatus = (!aTick.combatStatus) ? "" : aTick.combatStatus;
	this.declaredAction = "";
	this.declaredTickId = (isNaN(aTick.declaredTickId)) ? 0 : parseInt(aTick.declaredTickId,10);
	this.plannedDuration = 0;
	this.actualDuration = 0;

	this.resolved = 0;
}