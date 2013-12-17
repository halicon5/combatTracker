cTrack.engagementDAT = function(aName) {

	this.name = aName;
	this.timestamp = Date.now();

	this.currentTick = 0;
	this.combatants = {};
	this.notes = "";
}