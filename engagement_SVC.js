cTrack.engagementSVC = function(aEngDAT, aName) {
	this.d = aEngDAT;

	this.combatants = {};

	this.jsCLASSNAME = "cTrack.engagementSVC";
	this.initialize();
}


	cTrack.engagementSVC.prototype.initialize = function() {
		this.setCombatantSvcs();
		this.setStartingInitiative();
	}

	cTrack.engagementSVC.prototype.setCombatantSvcs = function() {
		if (this.d.combatants) {
			var sc = this.d.combatants;
 			for (var comb in sc) {
 				this.combatants[comb] = new cTrack.combatantSVC(sc[comb]);
 			}
		}
	}

	cTrack.engagementSVC.prototype.setStartingInitiative = function() {
		var lowestInit = 0;
		if (this.d.combatants) {
			var sc = this.d.combatants;
			for (var comb in sc) {
				if (sc[comb].initiative < lowestInit) {
					lowestInit = sc[comb].initiative;
				}
			}
		}
		this.d.startingTick = lowestInit;
	}

	cTrack.engagementSVC.prototype.addCombatantFromForm = function(f) {
		var dat = {};
		dat.name = f.inpCombName.value;
		dat.faction = f.inpFactionName.value;
		dat.initiative = f.inpInitiative.value;
		dat.HPtype = f.inpHPType.value;
		dat.maxHP = f.inpMaxHP.value;
		dat.maxBP = f.inpMaxBP.value;
		dat.maxWP = f.inpMaxWP.value;
		dat.maxSTAM = f.inpMaxSTAM.value;
		dat.baseDR = f.inpBaseDR.value;

		var origName = dat.name;
		var safeName = dat.name;

		var increm = "";
		while (this.d.combatants[safeName] ) {
			if (increm === "") {
				increm = 1;
			} else {
				increm++;
			}
			safeName = origName+'-'+increm;
		}
		dat.name = safeName;
		dat.prevTick = dat.initiative;
		dat.nextTick = dat.initiative;
		var newCombDAT = new cTrack.combatantDAT(dat);
		var newCombSVC = new cTrack.combatantSVC(newCombDAT);

		newCombDAT.prevTick = newCombDAT.initiative;
		newCombDAT.nextTick = newCombDAT.initiative;

		newCombDAT.name = safeName;
		this.d.combatants[safeName] = newCombDAT;
		this.combatants[safeName] = newCombSVC;
		this.setStartingInitiative();
	}