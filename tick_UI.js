cTrack.tickUI = function(params) {
	// aUI, aManager, targ, data, svc

	this.UI = params.UI; // top level UI
	this.dispBox = params.targ; // a div style node 
	this.Manager = params.Manager // the top level svc object
	this.data = params.data;	// current object level data
	this.svc = params.svc;		// current object level svc
	this.combatantUI = params.combatantUI;

	this.elements = {};
	this.elements.tickCell = undefined;
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
		this.elements.tickCell = div;

		this.elements.tickCell.innerHTML = this.data.tickId + 'ACT';
	}

	cTrack.tickUI.prototype.createEmptyTickCell = function(combatantName, tickId) {
		var div = createSuperElement("div", ["class","tickCell emptyCell"]);
		var cont = cTrack.tickUI.createEmptyCellContent(combatantName,tickId);
		cont.SCobj = cTrack.tickUI;
		cont.setAttribute("onclick","SCobj.openEmptyTickDialog(\"" + combatantName + "\"," + tickId + ");");
		appendChildren(div,cont);
		return div;
	}

	cTrack.tickUI.prototype.createEmptyCellContent = function(combatantName, tickId) {
		return createSuperElement('div', ["class","emptyCellContent"], ["innerHTML",tickId]);
	}


	cTrack.tickUI.prototype.openEmptyTickDialog = function(combatantName, tickId) {
		if (!cTrack.activePopup) {

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
