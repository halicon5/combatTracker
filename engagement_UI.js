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

	this.jsCLASSNAME = "cTrack.engagementUI";

	this.initialize();
}

	cTrack.engagementUI.prototype.initialize = function() {
		var box = createSuperElement("div", ["class","engagementMain"], ["innerHTML",this.data.name]);
		this.elements.mainBox = box;
		appendChildren(this.dispBox, box);
	}

	cTrack.engagementUI.prototype.updateDisplay = function() {

	}