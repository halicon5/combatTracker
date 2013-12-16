cTrack.tickDAT = function(aTick) {
	this.tickId = (!aTick.tickId) ? 0 : aTick.tickId;
	this.act = (!aTick.act) ? "" : aTick.act;
	this.tickStatus = 0;	// 0 open 1 complete
	this.combatStatus = (!aTick.combatStatus) ? "" : aTick.combatStatus;
	this.declaredAction = "";
	this.plannedDuration = 0;
	this.actualDuration = 0;
	this.nextTick = this.tickId + 1;
}