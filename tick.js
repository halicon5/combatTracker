cTrack.tick = function(aTick) {
	this.tickId = (!aTick.tickId) ? 0 : aTick.tickId;
	this.act = (!aTick.act) ? "" : aTick.act;
	this.combatStatus = (!aTick.combatStatus) ? "" : aTick.combatStatus;
	this.nextTick = this.tickId + 1;
	this.nextAction = "";
}