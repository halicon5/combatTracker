cTrack.combatantSVC = function(aCombatantDAT, aParentEngagement) {
	this.d = aCombatantDAT;

	this.engagementSvc = aParentEngagement; // a svc object referring to the parent engagment

	this.jsCLASSNAME = "cTrack.combatantSVC";
	this.initialize();
}

	cTrack.combatantSVC.prototype.initialize = function() {
		this.addInitialTick();
	}

	cTrack.combatantSVC.prototype.addInitialTick = function() {
		var dat = { tickId: this.d.initiative, combatStatus:"open"};
		this.d.ticks[this.d.initiative] = new cTrack.tickDAT(dat);
	}

	cTrack.combatantSVC.prototype.update = function() {
		if (!this.engagementSvc.d.status === 'active') {
			return false;
		}

		this.addMissingTicks();
	}

	cTrack.combatantSVC.prototype.addMissingTicks = function() {

	}