cTrack.combatantSVC = function(aCombatantDAT, aParentEngagement) {
	this.d = aCombatantDAT;

	this.engagementSvc = aParentEngagement; // a svc object referring to the parent engagment
	this.ticks = {};

	this.jsCLASSNAME = "cTrack.combatantSVC";
	this.initialize();
}

	cTrack.combatantSVC.prototype.initialize = function() {
		this.addInitialTick();
		this.update();
	}

	cTrack.combatantSVC.prototype.addTick = function(tickDAT) {
		var dat = new cTrack.tickDAT(tickDAT);
		var svc = new cTrack.tickSVC(dat, this);
		if (!this.d.ticks[dat.tickId]) {
			this.d.ticks[tickDAT.tickId] = dat;
			this.ticks[tickDAT.tickId] = svc;

			this.d.tickSeq.push(this.d.ticks[tickDAT.tickId]);
			this.d.tickSeq.sort( function( a,b ) {
				return a.tickId - b.tickId;
			});
		}
		this.update();
	}

	cTrack.combatantSVC.prototype.removeTick = function(tickId) {
		// destroy tick id 
		// delete and rebuild the sorted tick list
	}

	cTrack.combatantSVC.prototype.addInitialTick = function() {
		var dat = { tickId: this.d.initiative, combatStatus:"open"};
		this.addTick(dat);
	}

	cTrack.combatantSVC.prototype.update = function() {
		this.setMaxTick();
		this.setNextTick();
		if (!this.engagementSvc.d.status === 'active') {
			return false;
		}

		this.addMissingTicks();
	}

	cTrack.combatantSVC.prototype.setMaxTick = function() {
		this.d.maxTick = this.d.tickSeq[(this.d.tickSeq.length - 1)].tickId;
	}

	cTrack.combatantSVC.prototype.setNextTick = function() {
		for (var i = (this.d.tickSeq.length - 1); i > 0; i--) {
			this.d.nextTick = this.d.tickSeq[i].tickId;
		}
	}

	cTrack.combatantSVC.prototype.addMissingTicks = function() {

	}