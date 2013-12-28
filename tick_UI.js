cTrack.tickUI = function(params) {
	// aUI, aManager, targ, data, svc

	this.UI = params.UI; // top level UI
	this.dispBox = params.targ; // a div style node 
	this.Manager = params.Manager // the top level svc object
	this.data = params.data;	// current object level data
	this.svc = params.svc;		// current object level svc
	this.combatantUI = params.combatantUI;

	this.elements = {};

	this.subUIs = {};

	this.jsCLASSNAME = "cTrack.tickUI";

	this.initialize();
}

	cTrack.tickUI.prototype.initialize = function() {
		this.createTickCell();
	}

	cTrack.tickUI.prototype.createTickCell =function() {
		var div = createSuperElement("div", ["class","tickCellUIroot"]);
		this.elements.tickCell = div;

		this.elements.tickCell.innerHTML = this.data.tickId;
	}

	cTrack.tickUI.createEmptyTickCell = function(combatantName, tickId) {
		var div = createSuperElement("div", ["class","tickCell emptyCell"]);
		var cont = cTrack.tickUI.createEmptyCellContent(combatantName,tickId);
		appendChildren(div,cont);
		return div;
	}

	cTrack.tickUI.createEmptyCellContent = function(combatantName, tickId) {
		return createSuperElement('div', ["class","emptyCellContent"], ["innerHTML",tickId]);
	}