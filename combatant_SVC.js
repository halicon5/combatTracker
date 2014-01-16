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
		delete this.ticks[tickId];
		delete this.d.ticks[tickId];
		this.rebuildTickSeq();
	}

	cTrack.combatantSVC.prototype.rebuildTickSeq = function() {
		delete this.d.tickSeq;
		this.d.tickSeq = new Array();
		for (var t in this.d.ticks) {
			this.d.tickSeq.push(this.d.ticks[t]);
		}
		this.d.tickSeq.sort( function( a,b ) {
			return a.tickId - b.tickId;
		});	
	}

	cTrack.combatantSVC.prototype.addInitialTick = function() {
		var dat = { tickId: this.d.initiative, actionStatus:"Declare", declaredTickId: this.d.initiative};
		this.addTick(dat);
	}

	cTrack.combatantSVC.prototype.update = function() {
		this.setInitiative();
		this.setMaxTick();
		this.setNextTick();
		if (!this.engagementSvc.d.status === 'active') {
			return false;
		}

		this.addMissingTicks();
	}

	cTrack.combatantSVC.prototype.setInitiative = function() {
		if (this.d.tickSeq[0]) {
			this.d.initiative = this.d.tickSeq[0].tickId;
		}
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