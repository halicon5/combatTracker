cTrack.comManUI = function(aComManSVC, aDispBoxId) {
	this.Manager = aComManSVC;
	this.dispbox = document.getElementById(aDispBoxId);
	this.cssPrefix = "cTrack";

	this.elements = {};
	this.subUIs = {};

	this.jsCLASSNAME = "cTrack.comManUI";

	this.initialize();
}

	cTrack.comManUI.prototype.initialize = function() {
		// Store core UI structure in a two column table
		this.createMainInterfaceTable();
		this.createTopLeftMenu();
		this.createContextualLeftMenuNode();
	}

	cTrack.comManUI.prototype.createMainInterfaceTable = function() {
		var t = createSuperElement("table", ["id",cTrack.cssName+"UITABLE"]);
		var r = createSuperElement("tr");
		var lc = createSuperElement("td", ["id",cTrack.cssName+"LEFTMENU"]);
		var rc = createSuperElement("td", ["innerHTML","Right Column"], ["id",cTrack.cssName+"MAINCONTENT"]);
		
		this.elements.UImenuCol = lc;
		this.elements.UIcontent = rc;

		appendChildren(this.dispbox, t);
		appendChildren(t,r);
		appendChildren(r,lc,rc);
	}

	cTrack.comManUI.prototype.createTopLeftMenu = function() {
		var tm = createSuperElement("div", ["id",cTrack.cssName+"UITOPMENU"]);

		var comtempsDiv = createSuperElement("div");
		var comtemps = createSuperElement("a", ["innerHTML","Combatant Templates"], ["onclick","this.SCobj.displayComTempsMenu(); return false;"]);
		comtemps.SCobj = this;
		appendChildren(comtempsDiv, comtemps);

		var engDiv = createSuperElement("div");
		var eng = createSuperElement("a", ["innerHTML","Engagements"], ["onclick","this.SCobj.displayEngagementsMenu(); return false;"]);
		eng.SCobj = this;
		appendChildren(engDiv, eng);

		appendChildren(this.elements.UImenuCol, tm);
		appendChildren(tm, comtempsDiv, engDiv);
	}

	cTrack.comManUI.prototype.createContextualLeftMenuNode = function() {
		var mm = createSuperElement("div", ["id",cTrack.cssName+"UICONTEXTUALMENU"]);
		this.elements.UILeftContextMenu = mm;
		appendChildren(this.elements.UImenuCol,mm);
	}

	cTrack.comManUI.prototype.clearContextualMenu = function() {
		cTrack.removeDescendents(this.elements.UILeftContextMenu);
	}

	cTrack.comManUI.prototype.displayComTempsMenu = function() {
//		alert("comtemps menu");
	}

	cTrack.comManUI.prototype.displayEngagementsMenu = function() {
		this.clearContextualMenu();
		this.buildNewEngagementForm();
		this.buildEngagementList();
	}

	cTrack.comManUI.prototype.buildNewEngagementForm = function() {
		var d = createSuperElement("div");
		var inp = createSuperElement("input", ["size",15], ["maxlength",20]);
		var btn = createSuperElement("input", ["type", "button"], ["value","+"],["onclick","this.SCobj.addNewEngagement()"]);
		btn.SCobj = this;
		inp.SCobj = this;

		appendChildren(d,inp,btn);
		appendChildren(this.elements.UILeftContextMenu, d);
	}

	cTrack.comManUI.prototype.buildEngagementList = function() {

	}

	cTrack.comManUI.prototype.addNewEngagement = function() {
		this.Manager.addNewEngagement();
	}