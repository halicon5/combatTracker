cTrack.comManUI = function(aComManSVC, aDispBoxId) {
	this.Manager = aComManSVC;
	this.dispbox = document.getElementById(aDispBoxId);
	this.cssPrefix = "cTrack";

	this.elements = {};
	this.elements.forms = {};
	this.elements.forms.newEngagement = {};

	this.subUIs = {};
	this.contextMenuListA = {};
	this.contextMenuArrayA = [];
	this.contextMenuListB = {};
	this.contextMenuArrayB = [];

	this.jsCLASSNAME = "cTrack.comManUI";

	this.initialize();
}

	cTrack.comManUI.prototype.initialize = function() {
		// Store core UI structure in a two column table
		this.createMainInterfaceTable();
		this.createTopLeftMenu();
		this.createContextualLeftMenuNodes();
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

	cTrack.comManUI.prototype.createContextualLeftMenuNodes = function() {
		var mm = createSuperElement("div", ["id",cTrack.cssName+"UICONTEXTUALMENU"]);
		this.elements.UILeftContextMenuA = mm;
		appendChildren(this.elements.UImenuCol,mm);

		var bm = createSuperElement("div", ["id",cTrack.cssName+"UICONTEXTUALMENU"]);
		this.elements.UILeftContextMenuB = bm;
		appendChildren(this.elements.UImenuCol,bm);
	}

	cTrack.comManUI.prototype.clearContextualMenuA = function() {
		cTrack.removeDescendents(this.elements.UILeftContextMenuA);
		this.contextMenuListA = {};
		this.contextMenuArrayA = [];
	}


	cTrack.comManUI.prototype.clearContextualMenuB = function() {
		cTrack.removeDescendents(this.elements.UILeftContextMenuB);
		this.contextMenuListB = {};
		this.contextMenuArrayB = [];
	}

	cTrack.comManUI.prototype.displayComTempsMenu = function() {
//		alert("comtemps menu");
	}

	cTrack.comManUI.prototype.displayEngagementsMenu = function() {
		this.clearContextualMenuB();
		this.buildNewEngagementForm();
		this.buildEngagementList();
	}

	cTrack.comManUI.prototype.buildNewEngagementForm = function() {
		var d = createSuperElement("div");
		var inp = createSuperElement("input", ["size",15], ["maxlength",20]);
		var btn = createSuperElement("input", ["type", "button"], ["value","+"],["onclick","this.SCobj.addNewEngagement()"]);
		btn.SCobj = this;
		inp.SCobj = this;

		this.elements.forms.newEngagement.engName = inp;

		appendChildren(d,inp,btn);
		appendChildren(this.elements.UILeftContextMenuB, d);
	}


	cTrack.comManUI.prototype.buildEngagementList = function() {
		var sc = this.Manager.engagements;
		var i = 0;
		for (var eng in sc) {
			this.contextMenuArrayB[i++] = sc[eng].d;	// pass a copy of the data object to the array.
		}
		this.contextMenuArrayB.sort( function (a,b) { 
				if(a.timestamp && b.timestamp) {
					return b-a;
				}
			}
		)

		for (i = 0; i < this.contextMenuArrayB.length; i++) {
			this.createEngagementMenuItem(this.contextMenuArrayB[i].name);
		}
	}

	cTrack.comManUI.prototype.addNewEngagement = function() {
		trim(this.elements.forms.newEngagement.engName.value);
		this.Manager.addNewEngagement(this.elements.forms.newEngagement.engName.value);
		this.displayEngagementsMenu();
	}

	cTrack.comManUI.prototype.createEngagementMenuItem = function(engName) {
		var d = createSuperElement("div")
		var a = createSuperElement("a", ["innerHTML",engName], ["onclick","this.SCobj.selectEngagement(); return false;"] );
		appendChildren(d, a);
		appendChildren(this.elements.UILeftContextMenuB, d);
	}