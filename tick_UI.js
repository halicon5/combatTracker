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
	this.elements.forms = {};
	this.elements.forms.thisTick = undefined;
	this.elements.forms.nextTick = undefined;

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

	cTrack.tickUI.prototype.updateTickCell = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.updateTickCell = function() [" + this + "]",1);
		if (this.data) {
			this.elements.tickGrid.actionStatus.innerHTML = this.data.actionStatus;
		}
		else {

		}
		cTrack.log("FINISH cTrack.tickUI.prototype.updateTickCell = function() [" + this + "]",-1);
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
		var r1c2 = createSuperElement("td", ["innerHTML",this.data.actionStatus], ["class","tickStatus"]);

		r1c2.SCobj = this;
		r1c2.setAttribute("onclick", "SCobj.openExistingTickDialog()");
		
		this.elements.tickGrid.actionStatus = r1c2;

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
		cTrack.log("CALL cTrack.tickUI.prototype.openEmptyTickDialog = function() [" + this + "]",1);
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
		cTrack.log("FINISH cTrack.tickUI.prototype.openEmptyTickDialog = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.openExistingTickDialog = function() {
		cTrack.log("CALL cTrack.tickUI.prototype.openExistingTickDialog = function() [" + this + "]",1);
		if (!this.UI.activePopup) {
			var popupParams = {};

			var box = document.createElement("div");
			this.elements.dialogueBox = box;
			this.UI.createPopupOverlay(this.elements.dialogueBox, popupParams);
			box.setAttribute("class", "DialogueBox existingTickDialogueBox");
			var close = this.UI.createPopupCloseBtn({context: this, callback:"updateTickCell", buttonText:"Close Window"});
			box.appendChild(close);

			var table = createSuperElement("table");
			var r = createSuperElement("tr", ["valign","top"]);
			appendChildren(table, r);
			appendChildren(box,table);

			var r1c1 = createSuperElement("td");
			var r1c2 = createSuperElement("td");

			appendChildren(r,r1c1,r1c2);

			this.thisTickDialogForm(r1c1);
//			this.nextTickDialogForm(r1c2);

			appendChildren(this.UI.dispbox,box);
		}	
		cTrack.log("FINISH cTrack.tickUI.prototype.openExistingTickDialog = function() [" + this + "]",-1);
	}


	cTrack.tickUI.prototype.thisTickDialogForm = function(targ) {
		cTrack.log("CALL cTrack.tickUI.prototype.thisTickDialogForm = function() [" + this + "]",1);
		var head = createSuperElement("h3", ["innerHTML", "Tick " + this.data.tickId]);
		appendChildren(targ,head);
		this.createTickDetailsForm("thisTick", targ);
		cTrack.log("FINISH cTrack.tickUI.prototype.thisTickDialogForm = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.nextTickDialogForm = function(targ) {
		cTrack.log("CALL cTrack.tickUI.prototype.nextTickDialogForm = function() [" + this + "]",1);
		var head = createSuperElement("h3", ["innerHTML", "Next Tick - Changes will delete all future ticks for this combatant!"]);
		appendChildren(targ,head);
		cTrack.log("FINISH cTrack.tickUI.prototype.nextTickDialogForm = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createTickDetailsForm = function(groupName, targ) {
		cTrack.log("CALL cTrack.tickUI.prototype.createTickDetailsForm = function() [" + this + "]",1);

		var div = createSuperElement("div", ["innerHTML", cTrack.tickStatusConfig[this.data.actionStatus].descLong + ' declared on tick ' + this.data.declaredTickId] );
		var inpDecAct = createSuperElement("input", ["value",this.data.declaredAction], ["size",60]);
		appendChildren(targ,div,"Declared Action:",inpDecAct);

		var resDiv = createSuperElement("div");

/*
		var btnResolve = createSuperElement("input",["type", "checkbox"],['class','largeCheck'],["name",groupName + 'resolve'], ["id",groupName + "resolve"], ["value","R"] );
		if (this.data.resolved === 'R') {
			btnResolve.setAttribute("checked",true);
		}
		btnResolve.SCobj = this;
		btnResolve.setAttribute("onchange","this.SCobj.toggleResolveTickCheckbox();");
		var txtResolveLbl = createSuperElement("label", ["for",groupName + "resolve"], ["innerHTML","-Resolve tick"]);
		appendChildren(resDiv,btnResolve,txtResolveLbl);
*/
		appendChildren(resDiv, this.createResolutionRadioList("thisTickResolve"));
		appendChildren(targ, resDiv, this.createActionStatusList("thisTick",this.data));

		cTrack.log("FINISH cTrack.tickUI.prototype.createTickDetailsForm = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createResolutionRadioList = function(groupName) {
		cTrack.log("CALL cTrack.tickUI.prototype.createResolutionRadioList = function() [" + this + "]",1);

		var tbl = createSuperElement("table");
		if (this.data) {
			var row = createSuperElement("row", ["valign","top"]);
			appendChildren(tbl, row);

			var list = {};
			var col = "";

			for (var i = 0; i < cTrack.resolveOptsList.length; i++) {
				if (i%3==0) {
					col = createSuperElement("td");
					appendChildren(row,col);
				}

				var opt = {};
				var optName = cTrack.resolveOptsList[i].descShort;
				var d = createSuperElement("div");
				list[optName] = opt;

				opt.btnRadio = createSuperElement("input",["type", "radio"],['class','largeCheck'],["name",groupName], ["id",groupName + "_" + optName], ["value",optName] );
				opt.btnRadio.setAttribute("onchange","this.SCobj.changeTickResolutionStatus(this.value);");
				if (this.data.resolved === optName) {
					opt.btnRadio.setAttribute("selected",true);
					opt.btnRadio.setAttribute("checked",true);
				}
				opt.btnRadio.SCdata = this.data;
				opt.btnRadio.SCobj = this;
				opt.txtLabel = createSuperElement("label",["for",groupName + "_" + optName],["innerHTML",cTrack.resolveOptsList[i].descLong]);

				appendChildren(d,opt.btnRadio, opt.txtLabel);
				appendChildren(col,d);
			}
		}
		else {
			cTrack.log("ERROR cTrack.tickUI.prototype.createResolutionRadioList = function() [" + this + "] No data node");
		}
		return tbl;
		cTrack.log("FINISH cTrack.tickUI.prototype.createResolutionRadioList = function() [" + this + "]",-1);
	}

	cTrack.tickUI.prototype.createActionStatusList = function(groupName, tickDat) {
		cTrack.log("CALL cTrack.tickUI.prototype.createActionStatusList = function() [" + this + "]",1);

		if (!tickDat) {
			tickDat = new cTrack.tickDAT({});
		}

		var tbl = createSuperElement("table");
		var row = createSuperElement("row",["valign","top"]);
		appendChildren(tbl, row);
		var list = {};
		var col = "";
		for (var i = 0; i < cTrack.tickStatusOpts.length; i++) {
			if (i%4 == 0) {
				col = createSuperElement("td");
				appendChildren(row,col);
			}
			var opt = {};
			var optName = cTrack.tickStatusOpts[i].descShort;
			var d = createSuperElement("div");
			list[optName] = opt;

			opt.btnRadio = createSuperElement("input",["type", "radio"],["name",groupName], ["id",groupName + "_" + optName], ["value",optName] );
			opt.btnRadio.setAttribute("onchange","this.SCobj.changeTickActionStatus(this.value, this.SCdata);");
			if (tickDat.actionStatus === optName) {
				opt.btnRadio.setAttribute("selected",true);
				opt.btnRadio.setAttribute("checked",true);
			}
			opt.btnRadio.SCdata = tickDat;
			opt.btnRadio.SCobj = this;
			opt.txtLabel = createSuperElement("label",["for",groupName + "_" + optName],["innerHTML",cTrack.tickStatusOpts[i].descLong]);

			appendChildren(d,opt.btnRadio, opt.txtLabel);
			appendChildren(col,d);
		}

		cTrack.log("FINISH cTrack.tickUI.prototype.createActionStatusList = function() [" + this + "]",-1);
		return tbl;
	}

	cTrack.tickUI.prototype.changeTickActionStatus = function (actStatus, dataObj) {
		dataObj.actionStatus = actStatus;
	}

	cTrack.tickUI.prototype.changeTickResolutionStatus = function(resStatus) {
		alert(resStatus);
	}

