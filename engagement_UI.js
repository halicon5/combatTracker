cTrack.engagementUI = function(params) {
	// aUI, aManager, targ, data, svc

	this.UI = params.UI; // top level UI
	this.dispBox = params.targ; // a div style node 
	this.Manager = params.Manager // the top level svc object
	this.data = params.data;	// current object level data
	this.svc = params.svc;		// current object level svc

	this.elements = {};
	this.elements.summary = {};
	this.elements.combatChart = {};
	this.elements.newCombForm = {};

	this.combatants = {};	// collection of combatant UIs
	this.combatantsAlpha = [];	// sorted list of combatants by name
	this.combatantsFactionAlpha = []; // sorted list of combatants by faction/name
	this.combatantsNextUp = []; // sorted list of combatants by upcoming action


	this.jsCLASSNAME = "cTrack.engagementUI";

	this.initialize();
}

	cTrack.engagementUI.prototype.initialize = function() {
		this.createTopSummary();
		this.createMainBox();
		this.createCombatantChart();
		this.initializeCombatantUIs();
	}

	cTrack.engagementUI.prototype.initializeCombatantUIs = function() {
		if (this.svc && this.svc.combatants) {
			var sc = this.svc.combatants;
			for (var comb in sc) {
				if (!this.combatants[comb]) {
					this.combatants[comb] = new cTrack.combatantUI({UI:this.UI,Manager:this.Manager,svc:sc[comb], data:sc[comb].d, targ:this.elements.combatantChart});
				}
			}
		}
	}

	cTrack.engagementUI.prototype.createMainBox = function() {
		var box = createSuperElement("div", ["class","engagementMain"], ["innerHTML",this.data.name]);
		this.elements.mainBox = box;
		appendChildren(this.dispBox, box);
	}

	cTrack.engagementUI.prototype.createCombatantChart = function() {
		var box = createSuperElement("div", ["class","combatantChart"]);
		this.elements.combatantChart = box;
		appendChildren(this.elements.mainBox, box);
	}



	cTrack.engagementUI.prototype.createTopSummary = function() {
		var box = createSuperElement("div", ["class","engagementSummary"]);
		var table = createSuperElement("table");
		var topRow = createSuperElement("tr");
		var row2nd = createSuperElement("tr");
		var engNameLbl = createSuperElement("td", ["innerHTML","Engagement:"]);
		this.elements.summary.engName = createSuperElement("td", ["innerHTML",this.data.name], ["class","bigSummary"]);
		var initCountLbl = createSuperElement("td", ["innerHTML","Current Count:"]);
		this.elements.summary.currentTick = createSuperElement("td", ["innerHTML",this.data.currentTick], ["class","bigSummary"]);

		this.elements.newCombatantCell = createSuperElement("td", ["rowspan",2]);


		var engStatusLbl = createSuperElement("td", ["innerHTML","Status:"]);
		this.elements.summary.status = createSuperElement("td", ["innerHTML",this.data.status], ["class","smallSummary"]);

		var startTickLbl = createSuperElement("td", ["innerHTML","Starting Tick:"]);
		this.elements.summary.startingTick = createSuperElement("td", ["innerHTML",this.data.startingTick], ["class","smallSummary"]);

		appendChildren(this.dispBox, box);
		appendChildren(box, table);
		appendChildren(table,topRow,row2nd);
		appendChildren(topRow, engNameLbl, this.elements.summary.engName , initCountLbl, this.elements.summary.currentTick,this.elements.newCombatantCell);
		appendChildren(row2nd, engStatusLbl, this.elements.summary.status, startTickLbl, this.elements.summary.startingTick);

		this.elements.newCombForm = cTrack.combatantUI.createNewCombatantFormENG(this.elements.newCombatantCell, this, "addNewCombatantToEngagement()");

	}

	cTrack.engagementUI.prototype.updateDisplay = function() {
		this.initializeCombatantUIs();
		this.updateTopSummary();
		this.getNextUpSortOrder();
		this.updateTickChartDisplay();
	}

	cTrack.engagementUI.prototype.updateTopSummary = function() {
		this.elements.summary.startingTick.innerHTML = this.data.startingTick;
	}

	cTrack.engagementUI.prototype.addNewCombatantToEngagement = function() {
		if (cTrack.validate.newCombatantForm(this.elements.newCombForm) === true) {
			this.svc.addCombatantFromForm(this.elements.newCombForm);
			this.updateDisplay();
		};
	}

	cTrack.engagementUI.prototype.getNextUpSortOrder = function() {
		this.combatantsNextUp = [];
		var increm = 0;
		for (var comb in this.combatants) {
			this.combatantsNextUp[increm++] = this.combatants[comb];
		}
		this.combatantsNextUp.sort(function(a,b) {
			if (a.data && b.data) {
				return a.data.nextTick - b.data.nextTick;
			} else {
				return false;
			}
		});
	}

	cTrack.engagementUI.prototype.updateTickChartDisplay = function() {
		for (var i = 0; i < this.combatantsNextUp.length; i++) {
			appendChildren(this.elements.combatantChart,this.combatantsNextUp[i].elements.row);
		}
	}

