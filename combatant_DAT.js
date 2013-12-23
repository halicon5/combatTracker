cTrack.combatantDAT = function( aCDAT ) {
	this.name = (!aCDAT.name) ? "" : trim(aCDAT.name);
	this.faction = (!aCDAT.faction) ? "" : trim(aCDAT.faction);
	this.initiative = (!aCDAT.initiative) ? 0 : aCDAT.initiative;
	this.prevTick;
	this.nextTick;
	this.HPtype = (!aCDAT.HPtype) ? "S" : trim(aCDAT.HPtype);
	this.maxHP = (!aCDAT.maxHP) ? 4 : aCDAT.maxHP;
	this.maxBP = Math.floor(this.maxHP/2);
	this.maxWP = Math.ceil(this.maxHP/2);
	this.maxSTAM = (!aCDAT.maxSTAM) ? 40 : aCDAT.maxSTAM;
	this.baseDR = (!aCDAT.baseDR) ? 50 : aCDAT.baseDR;

	this.curHP = this.maxHP;
	this.curBP = this.maxBP;
	this.curWP = this.maxWP;
	this.curSTAM = this.maxSTAM;
	this.tempBP = (!aCDAT.tempBP) ? 0 : aCDAT.tempBP;
	this.tempWP = (!aCDAT.tempWP) ? 0 : aCDAT.tempWP;
	this.combatStatus = "Open";
	this.notes = "";

	this.offSeries = 0;
	this.defSeries = 0;

	this.offLog = {};
	this.defLog = {};
	this.injuryLog = {};
	this.ticks = {};

}