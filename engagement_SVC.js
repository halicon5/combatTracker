cTrack.engagementSVC = function(aEngDAT, aName) {
	this.d = aEngDAT;

	this.combatants = {};

	this.jsCLASSNAME = "cTrack.engagementSVC";
	this.initialize();
}


	cTrack.engagementSVC.prototype.initialize = function() {
		this.setCombatantSvcs();
	}

	cTrack.engagementSVC.prototype.setCombatantSvcs = function() {
		if (this.d.combatants) {
			var sc = this.d.combatants;
 			for (var comb in sc) {
 				this.combatants[comb] = new cTrack.combatantSVC(sc[comb]);
 			}
		}
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

		var newCombDAT = new cTrack.combatantDAT(dat);
		var newCombSVC = new cTrack.combatantSVC(dat);
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
		newCombDAT.name = safeName;
		this.d.combatants[safeName] = dat;
		this.combatants[safeName] = newCombSVC;
	}