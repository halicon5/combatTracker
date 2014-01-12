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
	this.elements.tickGrid = {};
	this.elements.tickGrid.combatStatus = undefined;
	this.elements.tickCellBox = undefined;
	this.elements.div = undefined;
	this.elements.emptyCellPopUp = undefined;
	this.elements.editTickPopUp = undefined;

	this.subUIs = {};

	this.jsCLASSNAME = "cTrack.tickUI";

	this.initialize();
}

	cTrack.tickUI.prototype.initialize = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.initialize = function() [" + this + "]",1);

		if (!this.data) {
			this.createEmptyTickCell();
		} else {
			this.createTickCell();
		}

		cTrack.log("FINISH cTrack.tickUI.prototype.initialize = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.toString = function() {
		if (this.combatantUI) {
			var str = this.combatantUI.data.name;
		} else {
			return "COMBATANT UNDEFINED";
		}

		if (this.data) {
			str += " Tick " + this.data.tickId;
		} else  {
			str += " Empty " + this.tickId;
		}

		return str;
	}

	cTrack.tickUI.prototype.createTickCell =function() {
		cTrack.log("CALL cTrack.tickUI.prototype.createTickCell = function() [" + this + "]",1);

		var div = createSuperElement("div", ["class","tickCellUIroot"]);
		this.elements.tickCellBox = div;

		this.createTickCellContent();

		cTrack.log("FINISH cTrack.tickUI.prototype.createTickCell = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createEmptyTickCell = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.createEmptyTickCell = function() [" + this + "]",1);

		var div = createSuperElement("div", ["class","tickCellUIroot"]);
		this.elements.tickCellBox = div;
		this.createEmptyCellContent();

		cTrack.log("FINISH cTrack.tickUI.prototype.createEmptyTickCell = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createTickCellContent = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.createTickCellContent = function() [" + this + "]",1);

		var cont = createSuperElement('div', ["class","tickCellContent"]);
		var grid = createSuperElement("table", ["class","tickGrid"]);
		var row1 = createSuperElement("tr", ["valign","top"]);
		var row2 = createSuperElement("tr", ["valign","top"]);

		var r1c1 = createSuperElement("td", ["innerHTML",this.data.tickId]);
		var r1c2 = createSuperElement("td", ["innerHTML",this.data.combatStatus], ["class","tickStatus"]);

		r1c2.SCobj = this;
		r1c2.setAttribute("onclick", "SCobj.openExistingTickDialog()");
		
		this.elements.tickGrid.combatStatus = r1c2;

		appendChildren(grid,row1);
		appendChildren(row1,r1c1,r1c2);
		appendChildren(cont,grid);

		appendChildren (this.elements.tickCellBox,cont);

		cTrack.log("FINISH cTrack.tickUI.prototype.createTickCellContent = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createEmptyCellContent = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.createEmptyCellContent = function() [" + this + "]",1);

		var cont = createSuperElement('div', ["class","emptyCellContent"], ["innerHTML",this.tickId]);
		cont.SCobj = this;
		cont.setAttribute("onclick","SCobj.openEmptyTickDialog(\"" + this.combatantUI.data.name + "\"," + this.tickId + ");");
		appendChildren(this.elements.tickCellBox,cont);

		cTrack.log("FINISH cTrack.tickUI.prototype.createEmptyCellContent = function() [" + this + "]",-1);
	}


	cTrack.tickUI.prototype.openEmptyTickDialog = function() {
		if (!this.UI.activePopup) {

			var box = document.createElement("div");
			this.elements.dialogueBox = box;
			this.UI.createPopupOverlay(this.elements.dialogueBox);
			box.setAttribute("class", "DialogueBox emptyTickDialogueBox");
			var close = this.UI.createPopupCloseBtn({buttonText:"Close Window"});

			/*.createElement("input");
			close.setAttribute("type", "button");
			close.setAttribute("value", "Close Experience Window");
			close.setAttribute("class", CM.CSSname + "closeButton");
			close.setAttribute("onclick", "this.CMUI.closeXpDialogue()");
			close.CMUI = this;
			*/

			box.appendChild(close);
			appendChildren(this.UI.dispbox,box);
		}
	}

	cTrack.tickUI.prototype.openExistingTickDialog = function() {
		if (!this.UI.activePopup) {

			var box = document.createElement("div");
			this.elements.dialogueBox = box;
			this.UI.createPopupOverlay(this.elements.dialogueBox);
			box.setAttribute("class", "DialogueBox emptyTickDialogueBox");
			var close = this.UI.createPopupCloseBtn({buttonText:"Close Window"});

			/*.createElement("input");
			close.setAttribute("type", "button");
			close.setAttribute("value", "Close Experience Window");
			close.setAttribute("class", CM.CSSname + "closeButton");
			close.setAttribute("onclick", "this.CMUI.closeXpDialogue()");
			close.CMUI = this;
			*/

			box.appendChild(close);
			appendChildren(this.UI.dispbox,box);
		}	
	}