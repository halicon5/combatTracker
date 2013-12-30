cTrack.tickUI = function(params) {
	// aUI, aManager, targ, data, svc

	this.UI = params.UI; // top level UI
	this.tickId = params.tickId;
	this.dispBox = params.targ; // a div style node 
	this.Manager = params.Manager // the top level svc object
	this.data = params.data;	// current object level data
	this.svc = params.svc;		// current object level svc
	this.combatantUI = params.combatantUI;

	this.elements = {};
	this.elements.tickCellBox = undefined;
	this.elements.div = undefined;
	this.elements.emptyCellPopUp = undefined;
	this.elements.editTickPopUp = undefined;

	this.subUIs = {};

	this.jsCLASSNAME = "cTrack.tickUI";

	this.initialize();
}

	cTrack.tickUI.prototype.initialize = function() {
		if (!this.data) {
			this.createEmptyTickCell();
		} else {
			this.createTickCell();
		}
	}

	cTrack.tickUI.prototype.createTickCell =function() {
		var div = createSuperElement("div", ["class","tickCellUIroot"]);
		this.elements.tickCellBox = div;

		this.elements.tickCellBox.innerHTML = this.data.tickId + 'ACT';
	}

	cTrack.tickUI.prototype.createEmptyTickCell = function(combatantName, tickId) {
		var div = createSuperElement("div", ["class","emptyCell"]);
		this.elements.tickCellBox = div;
		this.createEmptyCellContent();
		appendChildren(div,cont);
	}

	cTrack.tickUI.prototype.createEmptyCellContent = function(combatantName, tickId) {
		var cont = createSuperElement('div', ["class","emptyCellContent"], ["innerHTML",tickId]);
		this.createEmptyCellContent(combatantName,tickId);
		cont.SCobj = this;
		cont.setAttribute("onclick","SCobj.openEmptyTickDialog(\"" + combatantName + "\"," + tickId + ");");
		appendChildren(this.elements.tickCellBox,cont);
	}


	cTrack.tickUI.prototype.openEmptyTickDialog = function() {
		if (!this.UI.activePopup) {

/*			this.UI.activePopup = this;
			cTrack.createPopupOverlay();
			var box = document.createElement("div");
			box.setAttribute("class", cTrack.CSSname + "emptyTickDialogueBox");
			this.elements.dialogueBox = box;
			
			var close = document.createElement("input");
			close.setAttribute("type", "button");
			close.setAttribute("value", "Close Experience Window");
			close.setAttribute("class", CM.CSSname + "closeButton");
			close.setAttribute("onclick", "this.CMUI.closeXpDialogue()");
			close.CMUI = this;
		
			box.appendChild(close);
	
			this.createSummary();
			this.createXpForm();
			this.createXpLogDisplay();
*/
		}
	}
