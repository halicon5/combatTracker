cTrack.engagementDAT = function(aName, aEngDAT) {

	this.name = aName;
	this.timestamp = Date.now();

	this.status = "Set-up";
	this.startingTick = 0;
	this.currentTick = 0;
	this.combatants = {};
	this.notes = "";
}