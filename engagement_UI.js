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

	this.jsCLASSNAME = "cTrack.engagementUI";

	this.initialize();
}

	cTrack.engagementUI.prototype.initialize = function() {
		this.createTopSummary();
		this.createMainBox();
	}

	cTrack.engagementUI.prototype.createMainBox = function() {
		var box = createSuperElement("div", ["class","engagementMain"], ["innerHTML",this.data.name]);
		this.elements.mainBox = box;
		appendChildren(this.dispBox, box);
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

		appendChildren(this.dispBox, box);
		appendChildren(box, table);
		appendChildren(table,topRow,row2nd);
		appendChildren(topRow, engNameLbl, this.elements.summary.engName , initCountLbl, this.elements.summary.currentTick,this.elements.newCombatantCell);
		appendChildren(row2nd, engStatusLbl, this.elements.summary.status);

		this.elements.newCombForm = cTrack.combatantUI.createNewCombatantFormENG(this.elements.newCombatantCell, this, "addNewCombatantToEngagement()");

	}

	cTrack.engagementUI.prototype.updateDisplay = function() {

	}

	cTrack.engagementUI.prototype.addNewCombatantToEngagement = function() {
		if (cTrack.validate.newCombatantForm(this.elements.newCombForm) === true) {
			this.svc.addCombatantFromForm(this.elements.newCombForm);
			this.updateDisplay();
		};
	}